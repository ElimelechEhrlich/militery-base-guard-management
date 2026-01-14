import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcryptjs"
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/usersDto/user.entity';
import { User } from 'src/users/usersDto/usersDto';
ConfigModule.forRoot()



@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async loginUser(username: string, password: string) {
        const user: UserEntity | null = await this.usersService.findOneByUsername(username);
        if (!user) throw new UnauthorizedException();
        else {          
            const hashCompare: boolean = await bcrypt.compare(password, user.passwordHash)           
            if (!hashCompare) {
                throw new UnauthorizedException();
            }
        }
        const payload = { 
            id: user.id,
            username: user.username, 
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    verifyUser(cookie: string) :String  | any{
        try {
            return this.jwtService.verify(cookie.split("=")[1])
        } catch (error) {
            return false
        }
    }
}


