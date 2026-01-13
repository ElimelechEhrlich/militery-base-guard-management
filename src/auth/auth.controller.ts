import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async loginUser(@Body() bodyLogin: {username: string, password: string}, @Res({ passthrough: true }) response: Response) {
        const loginData = await this.authService.loginUser(bodyLogin['username'], bodyLogin['password']);
        response.cookie('access_token', loginData.access_token, {
            httpOnly: true, 
            sameSite: 'strict'
        });
        return { message: 'Success' };
    }
}

 