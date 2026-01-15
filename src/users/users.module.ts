import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from 'src/auth/role.guard';
import { CreateUserDto } from './usersDto/usersDto';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './usersDto/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
     imports: [SequelizeModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
     controllers: [UsersController],
     providers: [UsersService, RoleGuard, CreateUserDto],
     exports: [UsersService]
})
export class UsersModule { }