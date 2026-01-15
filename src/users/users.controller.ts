import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';
import { ValidationPipe } from 'src/users/usersDto/validation.pipe';
import { CreateUserDto, Role, type User } from './usersDto/usersDto';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserEntity } from './usersDto/user.entity';

@Controller('users')
//@UseGuards(UsersGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,       
    ) { }
    
    @HttpCode(HttpStatus.OK)
    @Get('all')
    @Roles([Role.commander])
    async getUser(): Promise<UserEntity[]> {
        return await this.usersService.findAll()
    }
    
    @Get()
    async getUserLoggedIn(@Req() request: any): Promise<UserEntity | null>{
        const token = this.authService.verifyUser(request.headers.cookie)
        if (token) {
            return await this.usersService.findOne(token.id)
        } else throw new UnauthorizedException();
    }

    @Post("add")
    @Roles([Role.commander])
    async create(@Body(//new ValidationPipe()
    ) createUserDto: User) {
        const newUser = [createUserDto['username'], createUserDto['password'], createUserDto['role']]
        console.log(newUser);
        return this.usersService.create(createUserDto['username'], createUserDto['password'], createUserDto['role']);
    }
}
