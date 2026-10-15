import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateAuthorCreate = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre del autor es obligatorio')
    .isString()
    .withMessage('El nombre debe ser un texto'),

  body('nacionalidad')
    .optional()
    .isString()
    .withMessage('La nacionalidad debe ser un texto'),

  body('biografia')
    .optional()
    .isString()
    .withMessage('La biografía debe ser un texto'),

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