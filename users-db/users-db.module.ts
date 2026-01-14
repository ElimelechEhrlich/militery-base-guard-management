import { Module } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { UsersDbController } from './users-db.controller';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from 'src/auth/role.guard';
import { UsersDbGuard } from './users-db.guard';
import { CreateUserDto } from 'src/users/usersDto/usersDto';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/usersDto/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports:[SequelizeModule.forFeature([UserEntity])],
  providers: [UsersDbService, AuthService, RoleGuard, UsersDbGuard, CreateUserDto,UsersService],
  controllers: [UsersDbController],
  exports:[SequelizeModule]
})
export class UsersDbModule {}
