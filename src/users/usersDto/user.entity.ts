import { IsEnum, isNotEmpty } from 'class-validator';
import { Role } from './usersDto';
import { Table, Column, Model, AllowNull, PrimaryKey, AutoIncrement } from 'sequelize-typescript';


@Table
export class UserEntity extends Model {

  @Column({allowNull:false})
  username: string;

  @Column({allowNull:false})
  passwordHash: string;

  @Column({allowNull:false})
  role: Role;
}