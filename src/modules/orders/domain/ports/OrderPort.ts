import { Order } from '../entities/Order';
import { CreateOrderDTO } from '../../application/dto/CreateOrderDTO';
import { UpdateOrderDTO } from '../../application/dto/UpdateOrderDTO';

export interface OrderPort {
    // Operaciones CRUD
    create(order: CreateOrderDTO): Promise<Order>;
    findAll(): Promise<Order[]>;
    findById(id: number): Promise<Order | null>;
    findByUsuarioId(usuarioId: number): Promise<Order[]>;
    update(id: number, order: UpdateOrderDTO): Promise<Order | null>;
    
    // Borrado Lógico (Requisito obligatorio)
    softDelete(id: number): Promise<boolean>;

    // Contar préstamos activos de un usuario (para aplicar regla de negocio)
    countActiveLoansByUser(usuarioId: number): Promise<number>;
}