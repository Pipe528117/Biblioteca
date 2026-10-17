import { OrderPort } from '../../domain/ports/OrderPort';
import { Order } from '../../domain/entities/Order';

export class GetOrders {
    constructor(private readonly orderPort: OrderPort) {}

    async execute(): Promise<Order[]> {
        return await this.orderPort.findAll();
    }
}