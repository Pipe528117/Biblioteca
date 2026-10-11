export interface AgentDecision {
    id: number;
    usuario_id: number;
    producto_id: number;
    prioridad_asignada: 'ALTA' | 'MEDIA' | 'BAJA';
    puntaje_calculado: number;
    justificacion: string;
    criterios_evaluados: {
        es_vulnerable: boolean;
        historial_sanciones: number;
        demanda_recurso: string;
    };
    created_at: Date;
}