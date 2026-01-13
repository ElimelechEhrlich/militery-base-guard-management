import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersDbService } from 'src/users-db/users-db.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcryptjs"
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot()



@Injectable()
export class AuthService {
    constructor(
        private readonly usersDbService: UsersDbService,
        private readonly jwtService: JwtService
    ) {}

    async loginUser(username: string, password: string) {
        const user: User | undefined = this.usersDbService.findOne(username);
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


