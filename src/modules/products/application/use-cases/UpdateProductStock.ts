import { ProductPort } from '../../domain/ports/ProductPort';

export class UpdateProductStock {
    constructor(private readonly productPort: ProductPort) {}

    async execute(id: number, cambioCantidad: number): Promise<boolean> {
        const product = await this.productPort.findById(id);
        if (!product) {
            throw new Error(`El libro con ID ${id} no existe.`);
        }

        if (product.stock_disponible + cambioCantidad < 0) {
            throw new Error('No hay stock suficiente disponible para prestar.');
        }

        return await this.productPort.updateStock(id, cambioCantidad);
    }
}