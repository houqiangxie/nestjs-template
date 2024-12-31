/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-31 16:27:57
 * @LastEditors: houqiangxie
 * @LastEditTime: 2024-12-31 16:42:11
 */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity'; // Import User entity

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>, // Inject User repository
        private jwtService: JwtService,
    ) { }

    // Validate user by userName and password
    async validateUser(userName: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { userName } });
        const hashPassword = await this.hashPassword(password);
        if (user && bcrypt.compareSync(hashPassword, user.password)) {
            const { password, ...result } = user; // Remove password from user data
            return result;
        }
        return null; // Return null if user is not found or password is incorrect
    }

    // Generate JWT token for the user
    async login(user: User) {
        const payload = { userName: user.userName, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // Hash user password before saving
    async hashPassword(password: string) {
        return bcrypt.hashSync(password, 10);
    }
}
