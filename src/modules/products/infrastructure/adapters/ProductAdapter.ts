import { ProductPort } from '../../domain/ports/ProductPort';
import { Product } from '../../domain/entities/Product';
import { CreateProductDTO } from '../../application/dto/CreateProductDTO';
import { UpdateProductDTO } from '../../application/dto/UpdateProductDTO';

export class ProductAdapter implements ProductPort {
    private productsDB: Product[] = [];

    async create(dto: CreateProductDTO): Promise<Product> {
        const newProduct: Product = {
            id: this.productsDB.length + 1,
            codigo_isbn: dto.codigo_isbn,
            titulo: dto.titulo,
            autor: dto.autor,
            editorial: dto.editorial,
            anio_publicacion: dto.anio_publicacion,
            categoria_id: dto.categoria_id,
            stock_total: dto.stock_total,
            stock_disponible: dto.stock_disponible ?? dto.stock_total,
            ubicacion_estante: dto.ubicacion_estante,
            estado: dto.estado || 'DISPONIBLE',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null,
        };
        this.productsDB.push(newProduct);
        return newProduct;
    }

    async findAll(): Promise<Product[]> {
        return this.productsDB.filter((p) => p.deleted_at === null);
    }

    async findById(id: number): Promise<Product | null> {
        const product = this.productsDB.find((p) => p.id === id && p.deleted_at === null);
        return product || null;
    }

    async findByIsbn(isbn: string): Promise<Product | null> {
        const product = this.productsDB.find((p) => p.codigo_isbn === isbn && p.deleted_at === null);
        return product || null;
    }

    async update(id: number, dto: UpdateProductDTO): Promise<Product | null> {
        const index = this.productsDB.findIndex((p) => p.id === id && p.deleted_at === null);
        if (index === -1) return null;

        this.productsDB[index] = {
            ...this.productsDB[index],
            ...dto,
            updated_at: new Date(),
        };
        return this.productsDB[index];
    }

    async softDelete(id: number): Promise<boolean> {
        const index = this.productsDB.findIndex((p) => p.id === id && p.deleted_at === null);
        if (index === -1) return false;

        this.productsDB[index].estado = 'INACTIVO';
        this.productsDB[index].deleted_at = new Date();
        this.productsDB[index].updated_at = new Date();
        return true;
    }

    async updateStock(id: number, cantidad: number): Promise<boolean> {
        const product = await this.findById(id);
        if (!product) return false;

        product.stock_disponible += cantidad;
        if (product.stock_disponible === 0) {
            product.estado = 'AGOTADO';
        } else if (product.stock_disponible > 0 && product.estado === 'AGOTADO') {
            product.estado = 'DISPONIBLE';
        }
        product.updated_at = new Date();
        return true;
    }
}