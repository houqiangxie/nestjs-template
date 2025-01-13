import { Module, MiddlewareConsumer, NestModule, RequestMethod, Dependencies, } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import KeyvRedis, { Keyv, createKeyv } from '@keyv/redis';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm';

import { databaseConfig,redisConfig } from './config/database.config'
import { JwtAuthGuard } from './common/guard/jwt-auth.guard';
import { ResponseInterceptor }from './common/filter/global-exception.filter'

import { LoggerMiddleware } from './common/middleware/Logger.middleware';
import { UserModule } from './user/user.module';
import {UploadModule} from './upload/upload.module'
import { AuthModule } from './auth/auth.module';


@Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const redisOptions = {
          url: `redis://localhost:6379/0`, // The Redis server URL (use 'rediss' for TLS)
          // 一些其他配置
        };
        return {
          stores: [
            new Keyv({
              store: new KeyvRedis(redisOptions),
              // namespace: 'cache', // 这里是namespace
              useKeyPrefix: false, // 如果想去掉重复的namespace的话，这里设置为false
            }),
            
            // 如果不想使用namespace的话，就和原来的一样
            // new KeyvRedis(redisOptions),
          ],
        };
      },
    }),
    UserModule,
    UploadModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path:'user',method:RequestMethod.GET});
  }

}
