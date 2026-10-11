export interface EvaluateLoanPriorityDTO {
    usuario_id: number;
    producto_id: number;
    es_vulnerable: boolean;
    historial_sanciones: number;
    stock_disponible: number;
}