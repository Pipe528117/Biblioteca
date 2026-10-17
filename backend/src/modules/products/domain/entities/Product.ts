export interface Product {
    id: number;
    codigo_isbn: string;
    titulo: string;
    autor: string;
    editorial: string;
    anio_publicacion: number;
    categoria_id: number;
    stock_total: number;
    stock_disponible: number;
    ubicacion_estante: string;
    estado: string; // 'DISPONIBLE', 'AGOTADO', 'MANTENIMIENTO', 'INACTIVO'
    created_at: Date | null;
    updated_at?: Date | null;
    deleted_at: Date | null;
}