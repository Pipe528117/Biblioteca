import { Pool } from 'pg';

export const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'biblioteca_db',
});

pool.on('connect', () => {
    console.log('🔗 Conexión exitosa a la base de datos PostgreSQL.');
});

pool.on('error', (err) => {
    console.error('❌ Error inesperado en el cliente de PostgreSQL:', err);
});