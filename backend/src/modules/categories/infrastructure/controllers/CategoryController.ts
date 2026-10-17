import { Request, Response } from 'express';
import { CategoryUseCase } from '../../application/use-cases/CategoryUseCase';

export class CategoryController {
  constructor(private readonly categoryUseCase: CategoryUseCase) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await this.categoryUseCase.createCategory(req.body);
      res.status(201).json({ success: true, data: category });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.categoryUseCase.getAllCategories();
      res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await this.categoryUseCase.getCategoryById(Number(req.params.id));
      res.status(200).json({ success: true, data: category });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await this.categoryUseCase.updateCategory(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: category });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.categoryUseCase.deleteCategory(Number(req.params.id));
      res.status(200).json({ success: true, message: 'Categoría eliminada exitosamente' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}