import { User } from '../entities/User';
import { CreateUserDTO } from '../../application/dto/CreateUserDTO';
import { UpdateUserDTO } from '../../application/dto/UpdateUserDTO';

export interface UserPort {
    // Operaciones CRUD
    create(user: CreateUserDTO): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByCodigo(codigo_usuario: string): Promise<User | null>;
    update(id: number, user: UpdateUserDTO): Promise<User | null>;
    
    // Borrado Lógico (Requisito del proyecto: modifica estado / marca deleted_at)
    softDelete(id: number): Promise<boolean>;
}