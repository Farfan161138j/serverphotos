import { User } from "../../domain/user";
import { UserEntity } from "./entities/user.entity";

export class UserMapper{
    static toEntity(domainUser: User): UserEntity{
        const entity = new UserEntity();
//sin poner lo de las fechas eso lo hace la bd 
        entity.userName = domainUser.userName; 
        entity.role = domainUser.role;
        entity.phone = domainUser.phone;
        entity.password = domainUser.password;
        entity.id = domainUser.id;
        entity.email = domainUser.email;
      

       return entity;
    }

    static toDomain(entity: UserEntity): User{
        return new User(
            //aqui mandamos ya con fechas por que ya lopuso la bd 
        entity.id,
        entity.userName,
        entity.email,
        entity.phone,
        entity.password,
        entity.createdAt,
        entity.updatedAt,
        entity.role
        );
       
    }
     
}