import { Router } from 'express';
import { PgCategoryRepository } from '../persistence/PgCategoryRepository';
import { CategoryUseCase } from '../../application/use-cases/CategoryUseCase';
import { CategoryController } from '../controllers/CategoryController';

const router = Router();

const categoryRepository = new PgCategoryRepository();
const categoryUseCase = new CategoryUseCase(categoryRepository);
const categoryController = new CategoryController(categoryUseCase);

router.post('/', categoryController.create);
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

export default router;