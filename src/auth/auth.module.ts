import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersDbService } from 'src/users-db/users-db.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET
        })],
    providers: [AuthService, UsersDbService],
    controllers: [AuthController]
})
export class AuthModule {}


