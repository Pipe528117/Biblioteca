import app from '../web/app';
import { ENV } from '../shared/config/env';
import { pool } from '../shared/config/database';

export async function startBootstrap() {
    try {
        // 1. Verificar la conexión a PostgreSQL
        const client = await pool.connect();
        console.log('✅ Conexión con PostgreSQL verificada exitosamente.');
        client.release();

        // 2. Arrancar el servidor Express
        app.listen(ENV.PORT, () => {
            console.log(`🚀 Servidor ejecutándose en http://localhost:${ENV.PORT}/api`);
            console.log(`📌 Healthcheck disponible en http://localhost:${ENV.PORT}/api/health`);
        });
    } catch (error) {
        console.error('❌ Error al inicializar el servidor o conectar a la base de datos:', error);
        process.exit(1);
    }
}