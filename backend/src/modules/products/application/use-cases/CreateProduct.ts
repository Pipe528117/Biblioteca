import { ProductPort } from '../../domain/ports/ProductPort';
import { Product } from '../../domain/entities/Product';
import { CreateProductDTO } from '../dto/CreateProductDTO';

export class CreateProduct {
    constructor(private readonly productPort: ProductPort) {}

    async execute(dto: CreateProductDTO): Promise<Product> {
        const existingIsbn = await this.productPort.findByIsbn(dto.codigo_isbn);
        if (existingIsbn) {
            throw new Error('El libro con este ISBN ya existe en el catálogo.');
        }

        return await this.productPort.create(dto);
    }
}