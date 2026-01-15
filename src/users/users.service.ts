import { Injectable } from '@nestjs/common';
import bcrypt from "bcryptjs"
import { Role } from './usersDto/usersDto';
import { UserEntity } from './usersDto/user.entity';
import { InjectModel } from '@nestjs/sequelize';




@Injectable()
export class UsersService {
    constructor(
        @InjectModel(UserEntity)
        private usersRepository: typeof UserEntity,
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return await this.usersRepository.findAll<UserEntity>();
    }

    async findOneByUsername(username: string): Promise<UserEntity | null> {
        return await this.usersRepository.findOne<UserEntity>({where : {username: username}});
    }

    async findOne(id: number): Promise<UserEntity | null> {
        return await this.usersRepository.findByPk(id)
    }

    async create(username:string, password:string, role:Role): Promise<object> {
        const passwordHash: string = await bcrypt.hash(password, 10)
        const data: UserEntity = new UserEntity({username, passwordHash, role})
        const res = this.usersRepository.create({...data})
        return {message: `Added course with id ${(await res).dataValues.id}`}
    }
}


  
 