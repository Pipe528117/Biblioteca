import { Request, Response } from 'express';
import { CreateProduct } from '../../application/use-cases/CreateProduct';
import { GetProducts } from '../../application/use-cases/GetProducts';
import { GetProductById } from '../../application/use-cases/GetProductById';
import { UpdateProduct } from '../../application/use-cases/UpdateProduct';
import { DeleteProduct } from '../../application/use-cases/DeleteProduct';
import { UpdateProductStock } from '../../application/use-cases/UpdateProductStock';

export class ProductController {
    constructor(
        private createProductUseCase: CreateProduct,
        private getProductsUseCase: GetProducts,
        private getProductByIdUseCase: GetProductById,
        private updateProductUseCase: UpdateProduct,
        private deleteProductUseCase: DeleteProduct,
        private updateStockUseCase: UpdateProductStock
    ) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const product = await this.createProductUseCase.execute(req.body);
            res.status(201).json({ success: true, data: product });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.getProductsUseCase.execute();
            res.status(200).json({ success: true, data: products });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const product = await this.getProductByIdUseCase.execute(id);
            res.status(200).json({ success: true, data: product });
        } catch (error: any) {
            res.status(404).json({ success: false, message: error.message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const updated = await this.updateProductUseCase.execute(id, req.body);
            res.status(200).json({ success: true, data: updated });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await this.deleteProductUseCase.execute(id);
            res.status(200).json({ success: true, message: 'Recurso marcado como inactivo (Borrado Lógico).' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async updateStock(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { cantidad } = req.body;
            await this.updateStockUseCase.execute(id, Number(cantidad));
            res.status(200).json({ success: true, message: 'Stock actualizado correctamente.' });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}