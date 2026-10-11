import { AIAgentPort } from '../../domain/ports/AIAgentPort';
import { AgentDecision } from '../../domain/entities/AgentDecision';
import { EvaluateLoanPriorityDTO } from '../../application/dto/EvaluateLoanPriorityDTO';

export class AIAgentAdapter implements AIAgentPort {
    private decisionsDB: AgentDecision[] = [];

    async evaluatePriority(dto: EvaluateLoanPriorityDTO): Promise<AgentDecision> {
        let puntaje = 50; // Puntaje base

        // Criterio ODS 4: Inclusión y equidad para estudiantes vulnerables
        if (dto.es_vulnerable) {
            puntaje += 30;
        }

        // Penalización por sanciones activas o pasadas
        if (dto.historial_sanciones > 0) {
            puntaje -= dto.historial_sanciones * 15;
        }

        // Criterio de escasez de stock del libro
        if (dto.stock_disponible <= 2) {
            puntaje += 10;
        }

        let prioridad: 'ALTA' | 'MEDIA' | 'BAJA' = 'MEDIA';
        if (puntaje >= 70) prioridad = 'ALTA';
        else if (puntaje < 40) prioridad = 'BAJA';

        const decision: AgentDecision = {
            id: this.decisionsDB.length + 1,
            usuario_id: dto.usuario_id,
            producto_id: dto.producto_id,
            prioridad_asignada: prioridad,
            puntaje_calculado: Math.max(0, Math.min(100, puntaje)),
            justificacion: `Decisión agéntica basada en equidad (ODS 4). Vulnerabilidad: ${dto.es_vulnerable}, Sanciones: ${dto.historial_sanciones}.`,
            criterios_evaluados: {
                es_vulnerable: dto.es_vulnerable,
                historial_sanciones: dto.historial_sanciones,
                demanda_recurso: dto.stock_disponible <= 2 ? 'ALTA' : 'NORMAL',
            },
            created_at: new Date(),
        };

        this.decisionsDB.push(decision);
        return decision;
    }

    async getDecisionHistory(usuarioId: number): Promise<AgentDecision[]> {
        return this.decisionsDB.filter((d) => d.usuario_id === usuarioId);
    }
}