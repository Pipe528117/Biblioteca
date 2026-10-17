import { ProductPort } from '../../domain/ports/ProductPort';
import { Product } from '../../domain/entities/Product';

export class GetProducts {
    constructor(private readonly productPort: ProductPort) {}

    async execute(): Promise<Product[]> {
        return await this.productPort.findAll();
    }
}