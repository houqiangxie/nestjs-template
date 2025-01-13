/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-30 11:17:50
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-13 09:54:46
 */
// src/config/database.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
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
    cache: {
        duration: 1000,
        type: 'redis',
        options: {
            host: 'localhost',
            port: 6379,
        },
    }
};

export const redisConfig = {
    store: redisStore,
    host: 'localhost',
    port: 6379,
    ttl: 0, // No expiration by default
    isGlobal: true,
}
