import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn,
   
} from 'typeorm';
import { UserRole } from 'src/modules/users/domain/user-role.enum';

@Entity ({name:'users'})

export class UserEntity{
    // usando uuid como defini en domain
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    userName: string;

    @Column('text', {unique: true, })// correo unico
    email: string;

    @Column('text')
    password: string;

    @Column('text')
    phone: string;

    @Column({
        type:'enum',
        enum: UserRole,
        default:UserRole.USER
    })
    role: UserRole;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt:Date;

    @DeleteDateColumn({name: 'deleted_at'})
    deletedAt: Date;


}