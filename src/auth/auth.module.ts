import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from 'src/users/usersDto/user.entity';

@Module({
    imports: [SequelizeModule.forFeature([UserEntity]),
        UsersModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET
        })],
    providers: [AuthService, UsersService],
    controllers: [AuthController],
    exports:[SequelizeModule]
})
export class AuthModule {}


