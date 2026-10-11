import { OrderPort } from '../../domain/ports/OrderPort';

export class DeleteOrder {
    constructor(private readonly orderPort: OrderPort) {}

    async execute(id: number): Promise<boolean> {
        const existing = await this.orderPort.findById(id);
        if (!existing) {
            throw new Error(`El préstamo con ID ${id} no existe.`);
        }

        // Borrado Lógico: Cambia estado a CANCELADO y marca deleted_at
        return await this.orderPort.softDelete(id);
    }
}