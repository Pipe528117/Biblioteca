export interface CreateOrderDTO {
    codigo_prestamo: string;
    usuario_id: number;
    producto_id: number;
    dias_prestamo?: number; // Por defecto ej. 7 días
    observaciones?: string;
}