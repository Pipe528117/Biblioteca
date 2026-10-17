import { OrderPort } from '../../domain/ports/OrderPort';
import { Order } from '../../domain/entities/Order';
import { CreateOrderDTO } from '../dto/CreateOrderDTO';

export class CreateOrder {
    constructor(private readonly orderPort: OrderPort) {}

    async execute(dto: CreateOrderDTO): Promise<Order> {
        // Regla de negocio: Máximo 3 préstamos activos simultáneos por usuario
        const activeLoans = await this.orderPort.countActiveLoansByUser(dto.usuario_id);
        if (activeLoans >= 3) {
            throw new Error('El usuario ya cuenta con el límite máximo de 3 préstamos activos.');
        }

        return await this.orderPort.create(dto);
    }
}