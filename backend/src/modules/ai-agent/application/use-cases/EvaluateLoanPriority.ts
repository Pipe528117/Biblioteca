import { AIAgentPort } from '../../domain/ports/AIAgentPort';
import { AgentDecision } from '../../domain/entities/AgentDecision';
import { EvaluateLoanPriorityDTO } from '../dto/EvaluateLoanPriorityDTO';

export class EvaluateLoanPriority {
    constructor(private readonly aiAgentPort: AIAgentPort) {}

    async execute(dto: EvaluateLoanPriorityDTO): Promise<AgentDecision> {
        return await this.aiAgentPort.evaluatePriority(dto);
    }
}