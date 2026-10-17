export interface CreateProductDTO {
    codigo_isbn: string;
    titulo: string;
    autor: string;
    editorial: string;
    anio_publicacion: number;
    categoria_id: number;
    stock_total: number;
    stock_disponible?: number;
    ubicacion_estante: string;
    estado?: string;
}