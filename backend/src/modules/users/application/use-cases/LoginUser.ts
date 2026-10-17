import { UserPort } from '../../domain/ports/UserPort';
import { User } from '../../domain/entities/User';

export class LoginUser {
    constructor(private readonly userPort: UserPort) {}

    async execute(email: string): Promise<User> {
        const user = await this.userPort.findByEmail(email);
        
        if (!user) {
            throw new Error('Credenciales inválidas.');
        }

        if (user.estado_cuenta === 'INACTIVO' || user.deleted_at !== null) {
            throw new Error('La cuenta se encuentra inactiva o deshabilitada.');
        }

        return user;
    }
}