import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User, UsersDbService } from 'src/users-db/users-db.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from "bcryptjs"
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/app.service';
ConfigModule.forRoot()



@Injectable()
export class AuthService {
    constructor(
        private readonly usersDbService: UsersDbService,
        private readonly jwtService: JwtService,
    ) {}
    getMocked(){
        return "auth mocked"
    }

    async loginUser(username: string, password: number) {
        const user: User | undefined = await this.usersDbService.findOne(username);
        if (!user) throw new UnauthorizedException();
        else {
            const hashCompare: boolean = await bcrypt.compare(password.toString(), user.passwordHash)           
            if (!hashCompare) throw new UnauthorizedException();
        }
        const payload = { 
            username: user.username, 
            sub: user.id
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}


