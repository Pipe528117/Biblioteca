import { Product } from '../entities/Product';
import { CreateProductDTO } from '../../application/dto/CreateProductDTO';
import { UpdateProductDTO } from '../../application/dto/UpdateProductDTO';

export interface ProductPort {
    // Operaciones CRUD
    create(product: CreateProductDTO): Promise<Product>;
    findAll(): Promise<Product[]>;
    findById(id: number): Promise<Product | null>;
    findByIsbn(isbn: string): Promise<Product | null>;
    update(id: number, product: UpdateProductDTO): Promise<Product | null>;
    
    // Borrado Lógico (Requisito del proyecto)
    softDelete(id: number): Promise<boolean>;

    // Métodos para control de stock en préstamos
    updateStock(id: number, cantidad: number): Promise<boolean>;
}