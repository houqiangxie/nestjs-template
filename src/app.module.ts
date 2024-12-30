/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-26 09:22:46
 * @LastEditors: houqiangxie
 * @LastEditTime: 2024-12-30 14:40:39
 */
import { Module, MiddlewareConsumer, NestModule, RequestMethod, Dependencies } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm';
import { databaseConfig } from './config/database.config'

import { LoggerMiddleware } from './common/middleware/Logger.middleware';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
// @Dependencies(DataSource)
@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    CatsModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private readonly dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path:'user',method:RequestMethod.GET});
  }

}
