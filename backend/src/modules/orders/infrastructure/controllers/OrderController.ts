import { Request, Response } from 'express';
import { CreateOrder } from '../../application/use-cases/CreateOrder';
import { GetOrders } from '../../application/use-cases/GetOrders';
import { GetOrderById } from '../../application/use-cases/GetOrderById';
import { UpdateOrder } from '../../application/use-cases/UpdateOrder';
import { DeleteOrder } from '../../application/use-cases/DeleteOrder';
import { ReturnProduct } from '../../application/use-cases/ReturnProduct';

export class OrderController {
    constructor(
        private createOrderUseCase: CreateOrder,
        private getOrdersUseCase: GetOrders,
        private getOrderByIdUseCase: GetOrderById,
        private updateOrderUseCase: UpdateOrder,
        private deleteOrderUseCase: DeleteOrder,
        private returnProductUseCase: ReturnProduct
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const order = await this.createOrderUseCase.execute(req.body);
            res.status(201).json({ success: true, data: order });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const orders = await this.getOrdersUseCase.execute();
            res.status(200).json({ success: true, data: orders });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const order = await this.getOrderByIdUseCase.execute(id);
            res.status(200).json({ success: true, data: order });
        } catch (error: any) {
            res.status(404).json({ success: false, message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const updated = await this.updateOrderUseCase.execute(id, req.body);
            res.status(200).json({ success: true, data: updated });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.deleteOrderUseCase.execute(id);
            res.status(200).json({ success: true, message: 'Préstamo cancelado correctamente (Borrado Lógico).' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async returnProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const result = await this.returnProductUseCase.execute(id);
            res.status(200).json({ success: true, data: result, message: 'Devolución procesada exitosamente.' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}