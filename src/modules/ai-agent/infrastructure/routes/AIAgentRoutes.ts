import { Router, Request, Response } from 'express';
import { AIAgentController } from '../controllers/AIAgentController';
import { AIAgentAdapter } from '../adapters/AIAgentAdapter';
import { EvaluateLoanPriority } from '../../application/use-cases/EvaluateLoanPriority';

const adapter = new AIAgentAdapter();
const evaluateUseCase = new EvaluateLoanPriority(adapter);
const controller = new AIAgentController(evaluateUseCase);

const router = Router();

router.post('/evaluate-priority', (req: Request, res: Response) => controller.evaluate(req, res));

export default router;