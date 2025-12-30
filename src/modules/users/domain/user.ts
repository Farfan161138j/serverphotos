import { UserRole } from "./user-role.enum";


export class User {
    id: string;
    userName: string;
    email: string;
    phone: string;
    role: UserRole;
    password: string;
    createdAt: Date | null;
    updatedAt: Date | null

    constructor (
        id: string,
    userName: string,
    email: string,
    phone: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
    role?: UserRole
    ){
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.createdAt = createdAt ?? null;
        this.updatedAt = updatedAt ?? null;
        
        // si se declara sin rol por defecto se le pone user
        this.role = role ?? UserRole.USER;

       // preguntar al usuario si es admiin, true o false 
        }
        public isAdmin(): boolean{
            return this.role === UserRole.ADMIN;
    }
}