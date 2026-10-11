import { Router } from 'express';
import { PgUserRepository } from '../persistence/PgUserRepository';
import { AuthUseCase } from '../../application/use-cases/AuthUseCase';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// Instanciamos la arquitectura hexagonal (Adaptador -> Caso de Uso -> Controlador)
const userRepository = new PgUserRepository();
const authUseCase = new AuthUseCase(userRepository);
const authController = new AuthController(authUseCase);

// Definición de las rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;