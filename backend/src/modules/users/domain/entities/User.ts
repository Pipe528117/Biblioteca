export type UserRole = 'ESTUDIANTE' | 'DOCENTE' | 'BIBLIOTECARIO' | 'ADMIN';

// Entidad principal
export interface User {
    id: number;
    codigo_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    rol: UserRole;
    es_vulnerable: boolean; // Util para la logica del Agente IA de inclusion ODS
    estado_cuenta: string; // 'ACTIVO', 'SUSPENDIDO', 'INACTIVO'
    created_at: Date | null;
    updated_at?: Date | null;
    deleted_at: Date | null;
}

// DTO para Creacion
export interface CreateUserDTO {
    codigo_usuario: string;
    nombre: string;
    apellido: string;
    email: string;
    password?: string;
    rol: UserRole;
    es_vulnerable?: boolean;
    estado_cuenta?: string;
}

// DTO para Actualizacion (Campos opcionales)
export type UpdateUserDTO = Partial<CreateUserDTO>;

// DTOs para reglas de negocio / Calculo de prioridad (Agente IA u Operaciones)
export interface PrioridadUsuarioInputDTO {
    promedio_academico?: number;
    sanciones_activas: number;
    es_vulnerable: boolean;
}

export interface PrioridadUsuarioResultadoDTO {
    usuario_id: number;
    puntaje_prioridad: number; // 0 a 100
    elegible_prestamo_prioritario: boolean;
    criterio_aplicado: string;
}