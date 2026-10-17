import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCategoryCreate = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre de la categoría es obligatorio')
    .isString()
    .withMessage('El nombre debe ser un texto'),

  body('descripcion')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];