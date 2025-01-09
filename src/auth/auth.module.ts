/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-31 16:27:49
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-08 15:42:25
 */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, secretKey } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity'; // Import User entity for TypeORM
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: secretKey, // This should be moved to an environment variable
            signOptions: { expiresIn: '2h' }, // JWT token expiration time
        }),
        TypeOrmModule.forFeature([User]), // Register User entity
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule { }
