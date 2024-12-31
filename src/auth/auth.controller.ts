import { Controller, Post, Body,Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorator/public.decorator';
@ApiTags('登录验证')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Login endpoint to authenticate and return JWT token
    @Public() // Allow access to this route without authentication
    @Post('login')
    async login(@Body() loginDto: { username: string; password: string }) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);

        if (!user) {
            throw new Error('Invalid credentials'); // Handle invalid login (you can customize this)
        }

        return this.authService.login(user); // Return JWT token
    }

    @Public() // Mark this route as public for CAPTCHA as well
    @Get('captcha')
    async generateCaptcha() {
        return { captcha: 'generated-captcha-value' };
    }
}
