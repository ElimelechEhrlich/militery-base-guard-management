import { Module } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { UsersDbController } from './users-db.controller';
import { AuthService } from 'src/auth/auth.service';
import { RoleGuard } from 'src/auth/role.guard';
import { UsersDbGuard } from './users-db.guard';


@Module({
  providers: [UsersDbService, AuthService, RoleGuard, UsersDbGuard],
  controllers: [UsersDbController],
})
export class UsersDbModule {}
