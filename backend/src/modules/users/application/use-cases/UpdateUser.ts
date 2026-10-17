import { UserPort } from '../../domain/ports/UserPort';
import { User } from '../../domain/entities/User';
import { UpdateUserDTO } from '../dto/UpdateUserDTO';

export class UpdateUser {
    constructor(private readonly userPort: UserPort) {}

    async execute(id: number, dto: UpdateUserDTO): Promise<User> {
        const existingUser = await this.userPort.findById(id);
        if (!existingUser) {
            throw new Error(`Usuario con ID ${id} no encontrado.`);
        }

        const updatedUser = await this.userPort.update(id, dto);
        if (!updatedUser) {
            throw new Error('No se pudo actualizar el usuario.');
        }

        return updatedUser;
    }
}