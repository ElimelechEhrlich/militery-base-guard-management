import { Injectable } from '@nestjs/common';

export type User = {
    id: number
    username: string,
    passwordHash: string
};

@Injectable()
export class UsersDbService {
    getAll(){
        const users = [
            { 
                id: 1,
                username: 'eli',
                passwordHash: '$2b$10$ytJ5MylUgwM4u.cPXjqC3OobhtaeASdkh3D2BS0etkLsGEeqOJpUa',
            },
            {
                id: 2,
                username: 'maria',
                passwordHash: 'guess',
            },
        ];
        return users
    }
    async findOne(username: string): Promise<User | undefined> {
        return this.getAll().find(user => user.username === username);
    }
}
