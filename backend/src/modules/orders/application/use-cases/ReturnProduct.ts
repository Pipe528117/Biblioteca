import { OrderPort } from '../../domain/ports/OrderPort';
import { Order } from '../../domain/entities/Order';

export class ReturnProduct {
    constructor(private readonly orderPort: OrderPort) {}

    async execute(id: number): Promise<Order> {
        const order = await this.orderPort.findById(id);
        if (!order) {
            throw new Error(`El préstamo con ID ${id} no existe.`);
        }

        if (order.estado === 'DEVUELTO') {
            throw new Error('Este préstamo ya fue devuelto previamente.');
        }

        const fechaActual = new Date();
        const estadoFinal = fechaActual > new Date(order.fecha_limite_devolucion) 
            ? 'CON_RETRASO' 
            : 'DEVUELTO';

        const updated = await this.orderPort.update(id, {
            estado: estadoFinal,
            fecha_entrega_real: fechaActual,
            observaciones: estadoFinal === 'CON_RETRASO' 
                ? 'Devuelto fuera del tiempo límite estipulado.' 
                : 'Devuelto a tiempo.',
        });

        if (!updated) {
            throw new Error('No se pudo procesar la devolución.');
        }

        return updated;
    }
}