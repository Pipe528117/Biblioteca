import Joi from 'joi';

// Formato de código de préstamo: PRES- seguido de 6 dígitos (ej. PRES-102030)
const codigoPrestamoRegex = /^PRES-\d{6}$/;

export const createOrderSchema = Joi.object({
    codigo_prestamo: Joi.string().pattern(codigoPrestamoRegex).required().messages({
        'string.pattern.base': 'El código de préstamo debe tener el formato PRES- seguido de 6 dígitos (ej. PRES-102030).',
        'any.required': 'El código de préstamo es obligatorio.',
    }),
    usuario_id: Joi.number().integer().positive().required(),
    producto_id: Joi.number().integer().positive().required(),
    dias_prestamo: Joi.number().integer().min(1).max(30).optional(),
    observaciones: Joi.string().max(255).optional(),
});

export const updateOrderSchema = Joi.object({
    estado: Joi.string().valid('SOLICITADO', 'PRESTADO', 'DEVUELTO', 'CON_RETRASO', 'CANCELADO').optional(),
    observaciones: Joi.string().max(255).optional(),
});