import { ProductPort } from '../../domain/ports/ProductPort';
import { Product } from '../../domain/entities/Product';
import { UpdateProductDTO } from '../dto/UpdateProductDTO';

export class UpdateProduct {
    constructor(private readonly productPort: ProductPort) {}

    async execute(id: number, dto: UpdateProductDTO): Promise<Product> {
        const existing = await this.productPort.findById(id);
        if (!existing) {
            throw new Error(`El libro con ID ${id} no existe.`);
        }

        const updated = await this.productPort.update(id, dto);
        if (!updated) {
            throw new Error('No se pudo actualizar la información del libro.');
        }

        return updated;
    }
}