// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5433,
    username: process.env.DB_USERNAME || 'nestuser',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_DATABASE || 'nestdb',
    // entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true, // 自动加载实体
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    // ssl: process.env.DB_SSL === 'true',
};
