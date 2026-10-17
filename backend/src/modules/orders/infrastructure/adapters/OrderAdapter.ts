import { OrderPort } from '../../domain/ports/OrderPort';
import { Order } from '../../domain/entities/Order';
import { CreateOrderDTO } from '../../application/dto/CreateOrderDTO';
import { UpdateOrderDTO } from '../../application/dto/UpdateOrderDTO';

export class OrderAdapter implements OrderPort {
    private ordersDB: Order[] = [];

    async create(dto: CreateOrderDTO): Promise<Order> {
        const fechaPrestamo = new Date();
        const dias = dto.dias_prestamo || 7;
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaPrestamo.getDate() + dias);

        const newOrder: Order = {
            id: this.ordersDB.length + 1,
            codigo_prestamo: dto.codigo_prestamo,
            usuario_id: dto.usuario_id,
            producto_id: dto.producto_id,
            fecha_prestamo: fechaPrestamo,
            fecha_limite_devolucion: fechaLimite,
            fecha_entrega_real: null,
            estado: 'PRESTADO',
            observaciones: dto.observaciones || 'Préstamo registrado exitosamente',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };
        this.ordersDB.push(newOrder);
        return newOrder;
    }

    async findAll(): Promise<Order[]> {
        return this.ordersDB.filter((o) => o.deleted_at === null);
    }

    async findById(id: number): Promise<Order | null> {
        const order = this.ordersDB.find((o) => o.id === id && o.deleted_at === null);
        return order || null;
    }

    async findByUsuarioId(usuarioId: number): Promise<Order[]> {
        return this.ordersDB.filter((o) => o.usuario_id === usuarioId && o.deleted_at === null);
    }

    async update(id: number, dto: UpdateOrderDTO): Promise<Order | null> {
        const index = this.ordersDB.findIndex((o) => o.id === id && o.deleted_at === null);
        if (index === -1) return null;

        this.ordersDB[index] = {
            ...this.ordersDB[index],
            ...dto,
            updated_at: new Date(),
        };
        return this.ordersDB[index];
    }

    async softDelete(id: number): Promise<boolean> {
        const index = this.ordersDB.findIndex((o) => o.id === id && o.deleted_at === null);
        if (index === -1) return false;

        this.ordersDB[index].estado = 'CANCELADO';
        this.ordersDB[index].deleted_at = new Date();
        this.ordersDB[index].updated_at = new Date();
        return true;
    }

    async countActiveLoansByUser(usuarioId: number): Promise<number> {
        return this.ordersDB.filter(
            (o) => o.usuario_id === usuarioId && o.estado === 'PRESTADO' && o.deleted_at === null
        ).length;
    }
}