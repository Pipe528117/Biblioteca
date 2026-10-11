export interface UserModelAttributes {
    id?: number;
    codigo_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    rol: string;
    es_vulnerable: boolean;
    estado_cuenta: string;
    created_at?: Date | null;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}