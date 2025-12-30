import { IsString, IsEmail, IsEnum, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../../domain/user-role.enum'; 


export class CreateUserDto{


    @IsString() 
    username : string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

    @IsString()
    @MinLength(6)
    password: string;
}
