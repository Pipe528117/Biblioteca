import Joi from 'joi';

// Expresión regular para validar formato ISBN-13 (ej. 978-3-16-148410-0 o sin guiones)
const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;

export const createProductSchema = Joi.object({
    codigo_isbn: Joi.string().pattern(isbnRegex).required().messages({
        'string.pattern.base': 'El código ISBN debe ser un ISBN válido de 10 o 13 dígitos.',
        'any.required': 'El código ISBN es obligatorio.',
    }),
    titulo: Joi.string().min(2).max(150).required(),
    autor: Joi.string().min(2).max(100).required(),
    editorial: Joi.string().min(2).max(100).required(),
    anio_publicacion: Joi.number().integer().min(1500).max(new Date().getFullYear()).required(),
    categoria_id: Joi.number().integer().positive().required(),
    stock_total: Joi.number().integer().min(1).required(),
    stock_disponible: Joi.number().integer().min(0).optional(),
    ubicacion_estante: Joi.string().required(),
    estado: Joi.string().valid('DISPONIBLE', 'AGOTADO', 'MANTENIMIENTO', 'INACTIVO').optional(),
});

export const updateProductSchema = Joi.object({
    titulo: Joi.string().min(2).max(150).optional(),
    autor: Joi.string().min(2).max(100).optional(),
    editorial: Joi.string().min(2).max(100).optional(),
    anio_publicacion: Joi.number().integer().min(1500).max(new Date().getFullYear()).optional(),
    categoria_id: Joi.number().integer().positive().optional(),
    stock_total: Joi.number().integer().min(1).optional(),
    ubicacion_estante: Joi.string().optional(),
    estado: Joi.string().valid('DISPONIBLE', 'AGOTADO', 'MANTENIMIENTO', 'INACTIVO').optional(),
});