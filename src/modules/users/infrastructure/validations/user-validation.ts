import Joi from 'joi';

const codigoRegex = /^U\d{8}$/;

export const createUserSchema = Joi.object({
    codigo_usuario: Joi.string().pattern(codigoRegex).required().messages({
        'string.pattern.base': 'El código de usuario debe tener el formato U seguido de 8 dígitos (ej. U12345678).',
        'any.required': 'El código de usuario es obligatorio.',
    }),
    nombre: Joi.string().min(2).max(50).required(),
    apellido: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).optional(),
    rol: Joi.string().valid('ESTUDIANTE', 'DOCENTE', 'BIBLIOTECARIO', 'ADMIN').required(),
    es_vulnerable: Joi.boolean().optional(),
    estado_cuenta: Joi.string().valid('ACTIVO', 'SUSPENDIDO', 'INACTIVO').optional(),
});

export const updateUserSchema = Joi.object({
    nombre: Joi.string().min(2).max(50).optional(),
    apellido: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    rol: Joi.string().valid('ESTUDIANTE', 'DOCENTE', 'BIBLIOTECARIO', 'ADMIN').optional(),
    es_vulnerable: Joi.boolean().optional(),
    estado_cuenta: Joi.string().valid('ACTIVO', 'SUSPENDIDO', 'INACTIVO').optional(),
});