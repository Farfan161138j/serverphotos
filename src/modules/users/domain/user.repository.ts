import { User } from "./user"; 
import { UserRole } from "./user-role.enum";
export interface UserRepository {
    
    // guarda el objeto user completo user nomas es temporal es como poner
    //const user = new User();
    save(user: User): Promise<void>; 

    // busca por gmail puede devolver el user o nulo depende el caso
    findByEmail(email: string): Promise<User | null>;

    // busca por id
    findById(id: string): Promise<User | null>;

    // mostrar todos los usuarios
    findAll(): Promise<User[]>;

    // borrar por id
    delete(id: string): Promise<void>;

    //no borrar ultimo admin
    countByRole(role: UserRole): Promise<number>;
    
}

// el famoso ticket de la pizzeria 
export const UserRepository = Symbol('UserRepository');