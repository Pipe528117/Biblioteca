import { ProductPort } from '../../domain/ports/ProductPort';

export class DeleteProduct {
    constructor(private readonly productPort: ProductPort) {}

    async execute(id: number): Promise<boolean> {
        const existing = await this.productPort.findById(id);
        if (!existing) {
            throw new Error(`El libro con ID ${id} no existe.`);
        }

        // Borrado Lógico: Conserva el registro en la BD cambiando su estado
        return await this.productPort.softDelete(id);
    }
}