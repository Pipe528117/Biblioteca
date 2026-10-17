import { Router } from 'express';
import authRoutes from '../modules/users/infrastructure/routes/auth.routes';
import userRoutes from '../modules/users/infrastructure/routes/UserRoutes';
import categoryRoutes from '../modules/categories/infrastructure/routes/category.routes';
import authorRoutes from '../modules/authors/infrastructure/routes/author.routes';
import aiAgentRoutes from '../modules/ai-agent/infrastructure/routes/AIAgentRoutes';
import productRoutes from '../modules/products/infrastructure/routes/ProductRoutes'; 

const router = Router();

// Registro de rutas por módulo
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/authors', authorRoutes);
router.use('/ai-agent', aiAgentRoutes);
router.use('/products', productRoutes); // <-- ¡Aquí registramos el endpoint /api/products!

// Endpoint de prueba / Healthcheck
router.get('/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'API del Sistema de Gestión de Biblioteca funcionando correctamente 🚀',
        timestamp: new Date(),
    });
});

export default router;