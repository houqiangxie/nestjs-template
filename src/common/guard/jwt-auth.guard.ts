/*
 * @Descripttion: 
 * @version: 
 * @Author: houqiangxie
 * @Date: 2024-12-31 16:44:45
 * @LastEditors: houqiangxie
 * @LastEditTime: 2025-01-08 16:14:56
 */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { 
    constructor(private reflector: Reflector, private readonly authService: AuthService) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean>  {
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true; // Skip JWT validation for routes with @Public() decorator
        }
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token not provided');
        }

        const isBlacklisted = await this.authService.isTokenBlacklisted(token);
        if (isBlacklisted) {
            throw new UnauthorizedException('Token is invalid');
        }

        return super.canActivate(context) as Promise<boolean>;
    }
}
