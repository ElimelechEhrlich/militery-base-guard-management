import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { type User, UsersDbService } from './users-db.service';
import { UsersDbGuard } from './users-db.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ValidationPipe } from 'src/users/usersDto/validation.pipe';
import { CreateUserDto, Role } from 'src/users/usersDto/usersDto';
import { AuthService } from 'src/auth/auth.service';
import { RequestHandler } from '@nestjs/common/interfaces';
import { Roles } from 'src/auth/roles.decorator';

@Controller('usersdb')
@UseGuards(UsersDbGuard)
export class UsersDbController {
    constructor(
        private readonly usersDbService: UsersDbService,
        private readonly authService: AuthService,       
    ) { }
    
    @HttpCode(HttpStatus.OK)
    @Get('all')
    @Roles([Role.commander])
    getUser(): User[] | any {
        return this.usersDbService.getAll()
    }
    
    @Get()
    getUserLoggedIn(@Req() request: any): User | undefined{
        const token = this.authService.verifyUser(request.headers.cookie)
        if (token) {
            return this.usersDbService.findOneById(token.id)
        } else throw new UnauthorizedException();
    }

    @Post("add")
    @Roles([Role.commander])
    async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        const newUser = [createUserDto['id'], createUserDto['username'], createUserDto['password'], createUserDto['role']]
        console.log(newUser);
        return this.usersDbService.create(createUserDto['id'], createUserDto['username'], createUserDto['password'], createUserDto['role']);
    }
}
