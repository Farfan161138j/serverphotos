import { UserRepository } from "../../domain/user.repository";
import { UserMapper } from "./user.mapper";
import { User } from "../../domain/user";
import { UserEntity } from "./entities/user.entity";
import { Injectable } from "@nestjs/common";
import { Entity, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "../../domain/user-role.enum";


@Injectable()
export class UserRepositoryImpl implements UserRepository{
    
    constructor (
        
        @InjectRepository (UserEntity)
        private readonly typeOrmRepo: Repository<UserEntity>


    ){}

    async save(user: User): Promise<void> {
    const entity = UserMapper.toEntity(user);
     await this.typeOrmRepo.save(entity);
    }


    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.typeOrmRepo.findOne ({where: {email}});
        //puede quedar {{email:email}} como en id, la regla es que deben ser igual los nombres
        //en este caso como los declare igual puede ser solo {{email}}

        if(!entity) return null; 

        return UserMapper.toDomain(entity);
    }

        async findById(id: string): Promise<User | null> {
            const entity = await this.typeOrmRepo.findOne({where: {id}});
            if(!entity) return null;
            return UserMapper.toDomain(entity);
        }

        async  findAll(): Promise<User[]>{
            const entities = await this.typeOrmRepo.find()
            return entities.map(entity => UserMapper.toDomain(entity));
        }

        async delete(id: string): Promise<void>{
           await this.typeOrmRepo.softDelete(id);     
        }

        async countByRole(role: UserRole): Promise<number>{
            const total = await this.typeOrmRepo.count({
                where: {role}
            });
            return total; 
        }




}