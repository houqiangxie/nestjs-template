/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-31 16:27:57
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-08 16:41:57
 */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity'; // Import User entity
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>, // Inject User repository
        private jwtService: JwtService,
        @Inject(CACHE_MANAGER) private readonly  cacheManager: Cache
    ) { }

    // Validate user by userName and password
    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { userName } });
        // const hashPassword = await this.hashPassword(password);
        if (user && bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user; // Remove password from user data
            return result;
        }
        return null; // Return null if user is not found or password is incorrect
    }

    // Generate JWT token for the user
    async login(user: User) {
        const payload = { userName: user.userName, sub: user.id };
        const accessToken = this.jwtService.sign(payload, { expiresIn: '2h' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        // Store token in Redis cache with expiration time (e.g., 2 hour)
        await this.cacheManager.set(`blacklist:${accessToken}`, 'valid', 7200);
        return {
            accessToken,
            refreshToken,
            message:'登录成功'
        };
    }

    async logout(token: string) {
        await this.cacheManager.set(`blacklist:${token}`, 'invalid', 0);
        return { message: '退出成功' };
    }

    // Hash user password before saving
    async hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }

    async isTokenBlacklisted(token: string): Promise<boolean> {
        const status = await this.cacheManager.get<string>(`blacklist:${token}`);
        return status === 'invalid';
    }

    async refresh(refreshToken: string): Promise<string> {
        try {
            const payload = this.jwtService.verify(refreshToken);
            const newToken = this.jwtService.sign({ userId: payload.userId, userName: payload.userName },{expiresIn: '2h'});
            return newToken;
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

}
