export interface Order {
    id: number;
    codigo_prestamo: string;
    usuario_id: number;
    producto_id: number;
    fecha_prestamo: Date;
    fecha_limite_devolucion: Date;
    fecha_entrega_real?: Date | null;
    estado: string; // 'SOLICITADO', 'PRESTADO', 'DEVUELTO', 'CON_RETRASO', 'CANCELADO'
    observaciones?: string;
    created_at: Date | null;
    updated_at?: Date | null;
    deleted_at: Date | null;
}