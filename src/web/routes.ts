import { Router } from 'express';
import authRoutes from '../modules/users/infrastructure/routes/auth.routes';
import userRoutes from '../modules/users/infrastructure/routes/UserRoutes';
// Cuando creemos los módulos de biblioteca los importaremos aquí:
// import bookRoutes from '../modules/books/infrastructure/routes/BookRoutes';
// import loanRoutes from '../modules/loans/infrastructure/routes/LoanRoutes';
import aiAgentRoutes from '../modules/ai-agent/infrastructure/routes/AIAgentRoutes';

const router = Router();

// Registro de rutas por módulo
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
// router.use('/books', bookRoutes);
// router.use('/loans', loanRoutes);
router.use('/ai-agent', aiAgentRoutes);

// Endpoint de prueba / Healthcheck
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API del Sistema de Gestión de Biblioteca funcionando correctamente 🚀',
        timestamp: new Date(),
    });
});

export default router;