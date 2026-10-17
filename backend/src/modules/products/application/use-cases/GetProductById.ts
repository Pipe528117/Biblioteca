import { ProductPort } from '../../domain/ports/ProductPort';
import { Product } from '../../domain/entities/Product';

export class GetProductById {
    constructor(private readonly productPort: ProductPort) {}

    async execute(id: number): Promise<Product> {
        const product = await this.productPort.findById(id);
        if (!product) {
            throw new Error(`El libro con ID ${id} no se encuentra registrado.`);
        }
        return product;
    }
}