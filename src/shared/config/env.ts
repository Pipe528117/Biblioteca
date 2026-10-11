import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    JWT_SECRET: process.env.JWT_SECRET || 'super_secret_jwt_key_uniminuto',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '8h',
};