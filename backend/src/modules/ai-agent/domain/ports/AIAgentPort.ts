import { AgentDecision } from '../entities/AgentDecision';
import { EvaluateLoanPriorityDTO } from '../../application/dto/EvaluateLoanPriorityDTO';

export interface AIAgentPort {
    evaluatePriority(dto: EvaluateLoanPriorityDTO): Promise<AgentDecision>;
    getDecisionHistory(usuarioId: number): Promise<AgentDecision[]>;
}