import { OrderPort } from '../../domain/ports/OrderPort';
import { Order } from '../../domain/entities/Order';

export class GetOrderById {
    constructor(private readonly orderPort: OrderPort) {}

    async execute(id: number): Promise<Order> {
        const order = await this.orderPort.findById(id);
        if (!order) {
            throw new Error(`El préstamo con ID ${id} no existe.`);
        }
        return order;
    }
}