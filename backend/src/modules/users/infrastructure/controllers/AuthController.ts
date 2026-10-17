import { Request, Response } from 'express';
import { AuthUseCase } from '../../application/use-cases/AuthUseCase';

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.authUseCase.register(req.body);
      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: user
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Error al registrar usuario'
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const result = await this.authUseCase.login(email, password);
      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: result
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Credenciales incorrectas'
      });
    }
  };
}