import { Request, Response } from 'express';
import { AuthorUseCase } from '../../application/use-cases/AuthorUseCase';

export class AuthorController {
  constructor(private readonly authorUseCase: AuthorUseCase) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const author = await this.authorUseCase.createAuthor(req.body);
      res.status(201).json({ success: true, data: author });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  getAll = async (_req: Request, res: Response): Promise<void> => {
    try {
      const authors = await this.authorUseCase.getAllAuthors();
      res.status(200).json({ success: true, data: authors });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      const author = await this.authorUseCase.getAuthorById(Number(req.params.id));
      res.status(200).json({ success: true, data: author });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const author = await this.authorUseCase.updateAuthor(Number(req.params.id), req.body);
      res.status(200).json({ success: true, data: author });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.authorUseCase.deleteAuthor(Number(req.params.id));
      res.status(200).json({ success: true, message: 'Autor eliminado exitosamente' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
}