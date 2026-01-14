import { IsString, IsNumber, IsEnum, IsNotEmpty } from 'class-validator';

export enum Role{
    "soldier" = "soldier",
    "commander" = "commander"
}

export type User = {
    id: number,
    username: string,
    passwordHash: string,
    role: Role
};


export class CreateUserDto {

    
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
  
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
