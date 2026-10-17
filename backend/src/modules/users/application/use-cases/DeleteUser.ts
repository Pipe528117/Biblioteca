import { UserPort } from '../../domain/ports/UserPort';

export class DeleteUser {
    constructor(private readonly userPort: UserPort) {}

    async execute(id: number): Promise<boolean> {
        const existingUser = await this.userPort.findById(id);
        if (!existingUser) {
            throw new Error(`Usuario con ID ${id} no encontrado.`);
        }

        // Ejecuta el borrado lógico (cambia estado_cuenta a INACTIVO y asigna deleted_at)
        return await this.userPort.softDelete(id);
    }
}