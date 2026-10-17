export interface PrioridadUsuarioInputDTO {
    promedio_academico?: number;
    sanciones_activas: number;
    es_vulnerable: boolean;
}

export interface PrioridadUsuarioResultadoDTO {
    usuario_id: number;
    puntaje_prioridad: number;
    elegible_prestamo_prioritario: boolean;
    criterio_aplicado: string;
}