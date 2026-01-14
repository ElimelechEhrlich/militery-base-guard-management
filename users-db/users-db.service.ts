import { Injectable, VersioningType } from '@nestjs/common';
import bcrypt from "bcryptjs"
import { Role } from 'src/users/usersDto/usersDto';

export type User = {
    id: number,
    username: string,
    passwordHash: string,
    role: "commander" | "soldier"
};

@Injectable()
export class UsersDbService {
    getAll(){
        const users: User[] = [
            { 
                id: 1,
                username: 'eli',
                passwordHash: '$2b$10$44O12n3UtenSxSilVy9MSuFcHjptuWA0R3aZjqk.VFcLF0CZg9/6S',
                role: 'commander'
            },
            {
                id: 2,
                username: 'maria',
                passwordHash: 'guess',
                role: 'soldier'
            },
            {
                id: 3,
                username: 'avi',
                passwordHash: '$2b$10$P3aWeMZgVC4iGoBEku5u8.WVoMbavLWl77oQUWg1hm8.BFk9ruuEq',
                role: 'soldier'
            }
        ];
        return users
    }
    
    async create(id: number, username:string, password:string, role:Role) {
        const passwordHash: string = await bcrypt.hash(password, 10)
        const users = this.getAll().map(user => user)
        console.log(users);
        users.push({id, username, passwordHash, role})
        console.log(users);       
        return {message: "The addition was successful."}
    }

    findOneByUsername(username: string): User | undefined {
        return this.getAll().find(user => user.username === username);
    }

    findOneById(id: number): User | undefined {
        return this.getAll().find(user => user.id === id);
    }
    
}
