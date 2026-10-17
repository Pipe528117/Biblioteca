import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('🔥 Error no controlado:', err.stack || err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor.';

    res.status(statusCode).json({
        success: false,
        error: message,
    });
};