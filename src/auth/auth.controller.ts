import { Controller, Post, Body,Get,Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
import { Auth } from './auth.entity';
@ApiTags('登录验证')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Login endpoint to authenticate and return JWT token
    @Public() // Allow access to this route without authentication
    @Post('login')
    async login(@Body() loginDto: Auth) {
        const user = await this.authService.validateUser(loginDto.userName, loginDto.password);
        if (!user) {
            throw new Error('Invalid credentials'); // Handle invalid login (you can customize this)
        }

        return this.authService.login(user); // Return JWT token
    }


    // Logout endpoint to invalidate JWT token
    @Post('logout')
    async logout(@Req() req) {
        const token = req.headers.authorization.split(' ')[1];
        return this.authService.logout(token);
    }

    @Public() // Mark this route as public for CAPTCHA as well
    @Get('captcha')
    async generateCaptcha() {
        return { captcha: 'generated-captcha-value' };
    }
}
