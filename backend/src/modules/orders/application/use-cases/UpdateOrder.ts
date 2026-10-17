import { OrderPort } from '../../domain/ports/OrderPort';
import { Order } from '../../domain/entities/Order';
import { UpdateOrderDTO } from '../dto/UpdateOrderDTO';

export class UpdateOrder {
    constructor(private readonly orderPort: OrderPort) {}

    async execute(id: number, dto: UpdateOrderDTO): Promise<Order> {
        const existing = await this.orderPort.findById(id);
        if (!existing) {
            throw new Error(`El préstamo con ID ${id} no existe.`);
        }

        const updated = await this.orderPort.update(id, dto);
        if (!updated) {
            throw new Error('No se pudo actualizar la información del préstamo.');
        }

        return updated;
    }
}