import { UserPort } from '../../domain/ports/UserPort';
import { User } from '../../domain/entities/User';
import { CreateUserDTO } from '../dto/CreateUserDTO';

export class CreateUser {
    constructor(private readonly userPort: UserPort) {}

    async execute(dto: CreateUserDTO): Promise<User> {
        // Validación de existencia previa por correo electrónico
        const existingEmail = await this.userPort.findByEmail(dto.email);
        if (existingEmail) {
            throw new Error('El correo electrónico ya se encuentra registrado.');
        }

        // Validación de existencia previa por código de usuario institucional
        const existingCodigo = await this.userPort.findByCodigo(dto.codigo_usuario);
        if (existingCodigo) {
            throw new Error('El código de usuario ya se encuentra registrado.');
        }

        return await this.userPort.create(dto);
    }
}