import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';

export const secretKey = '123456'; // Secret key for JWT token

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
            ignoreExpiration: false,
            secretOrKey: secretKey, // Use the same secret key as in JwtModule
        });
    }

    // Validate the JWT payload and return user data
    async validate(payload: any) {
        return { userId: payload.sub, userName: payload.userName };
    }
}


