import { Router } from 'express';
import { PgAuthorRepository } from '../persistence/PgAuthorRepository';
import { AuthorUseCase } from '../../application/use-cases/AuthorUseCase';
import { AuthorController } from '../controllers/AuthorController';

const router = Router();

const authorRepository = new PgAuthorRepository();
const authorUseCase = new AuthorUseCase(authorRepository);
const authorController = new AuthorController(authorUseCase);

router.post('/', authorController.create);
router.get('/', authorController.getAll);
router.get('/:id', authorController.getById);
router.put('/:id', authorController.update);
router.delete('/:id', authorController.delete);

export default router;