import express, { Application } from 'express';
import cors from 'cors';
import router from './routes';
import { errorHandler } from '../shared/middleware/errorHandler';

const app: Application = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales de la API
app.use('/api', router);

// Middleware global para manejo de errores
app.use(errorHandler);

export default app;