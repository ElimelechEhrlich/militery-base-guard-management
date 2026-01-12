import { Body, Controller,Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Get()
    getMocked(): string {
        return this.authService.getMocked()
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async loginUser(@Body() loginDto) {
        return await this.authService.loginUser(loginDto.username, loginDto.password);
    }
}
