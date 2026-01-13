import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UsersDbService } from './users-db.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersDbGuard } from './users-db.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('users-db')
export class UsersDbController {
    constructor(
        private readonly usersDbService: UsersDbService
    ){}

    @UseGuards(UsersDbGuard)
    @HttpCode(HttpStatus.OK)
    @Get()
    getUser() :String  | any{
        return this.usersDbService.getAll()
    }

    @UseGuards(RoleGuard)
    @Post("add")
    async create(@Body() createUserDto: object) {
        const newUser = [createUserDto['id'], createUserDto['username'], createUserDto['password'], createUserDto['role']]
        console.log(newUser);       
        return this.usersDbService.create(createUserDto['id'], createUserDto['username'], createUserDto['password'], createUserDto['role']);
    }

}
