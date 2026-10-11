import { UserPort } from '../../domain/ports/UserPort';
import { User } from '../../domain/entities/User';
import { CreateUserDTO } from '../../application/dto/CreateUserDTO';
import { UpdateUserDTO } from '../../application/dto/UpdateUserDTO';

export class UserAdapter implements UserPort {
    private usersDB: User[] = [];

    async create(dto: CreateUserDTO): Promise<User> {
        const newUser: User = {
            id: this.usersDB.length + 1,
            codigo_usuario: dto.codigo_usuario,
            nombre: dto.nombre,
            apellido: dto.apellido,
            email: dto.email,
            password: dto.password || '123456',
            rol: dto.rol,
            es_vulnerable: dto.es_vulnerable ?? false,
            estado_cuenta: dto.estado_cuenta || 'ACTIVO',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };
        this.usersDB.push(newUser);
        return newUser;
    }

    async findAll(): Promise<User[]> {
        return this.usersDB.filter((u) => u.deleted_at === null);
    }

    async findById(id: number): Promise<User | null> {
        const user = this.usersDB.find((u) => u.id === id && u.deleted_at === null);
        return user || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.usersDB.find((u) => u.email === email && u.deleted_at === null);
        return user || null;
    }

    async findByCodigo(codigo_usuario: string): Promise<User | null> {
        const user = this.usersDB.find((u) => u.codigo_usuario === codigo_usuario && u.deleted_at === null);
        return user || null;
    }

    async update(id: number, dto: UpdateUserDTO): Promise<User | null> {
        const index = this.usersDB.findIndex((u) => u.id === id && u.deleted_at === null);
        if (index === -1) return null;

        this.usersDB[index] = {
            ...this.usersDB[index],
            ...dto,
            updated_at: new Date(),
        };
        return this.usersDB[index];
    }

    async softDelete(id: number): Promise<boolean> {
        const index = this.usersDB.findIndex((u) => u.id === id && u.deleted_at === null);
        if (index === -1) return false;

        this.usersDB[index].estado_cuenta = 'INACTIVO';
        this.usersDB[index].deleted_at = new Date();
        this.usersDB[index].updated_at = new Date();
        return true;
    }
}