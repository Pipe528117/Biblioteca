import { UserRole } from '../../domain/entities/User';

export interface CreateUserDTO {
    codigo_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    rol: UserRole;
    es_vulnerable?: boolean;
    estado_cuenta?: string;
}