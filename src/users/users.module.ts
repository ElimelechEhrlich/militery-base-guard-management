import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from 'src/auth/role.guard';
import { CreateUserDto } from './usersDto/usersDto';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './usersDto/user.entity';

@Module({
     imports: [SequelizeModule.forFeature([UserEntity]),DatabaseModule],
     controllers: [UsersController],
     providers: [UsersService, ...UsersProviders, AuthService, RoleGuard, CreateUserDto],
})
export class UsersModule { }