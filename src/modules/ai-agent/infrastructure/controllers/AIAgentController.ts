import { Request, Response } from 'express';
import { EvaluateLoanPriority } from '../../application/use-cases/EvaluateLoanPriority';

export class AIAgentController {
    constructor(private evaluateLoanPriorityUseCase: EvaluateLoanPriority) {}

    async evaluate(req: Request, res: Response): Promise<void> {
        try {
            const decision = await this.evaluateLoanPriorityUseCase.execute(req.body);
            res.status(200).json({ success: true, data: decision });
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}