import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { 
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('request.headers: ', request.headers);
        console.log('Authorization Header:', request.headers.authorization);
        const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
        if (isPublic) {
            return true; // Skip JWT validation for routes with @Public() decorator
        }
        return super.canActivate(context); // Run default JWT validation for other routes
    }
}
