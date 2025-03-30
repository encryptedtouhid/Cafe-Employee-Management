const Joi = require('joi');

class CafeValidator {
    validateCreateCafe(data) {
        const schema = Joi.object({
            name: Joi.string()
                .min(6)
                .max(10)
                .required()
                .messages({
                    'string.min': 'Name must be at least 6 characters long',
                    'string.max': 'Name cannot exceed 10 characters',
                    'any.required': 'Name is required'
                }),

            description: Joi.string()
                .max(256)
                .required()
                .messages({
                    'string.max': 'Description cannot exceed 256 characters',
                    'any.required': 'Description is required'
                }),

            logo: Joi.string()
                .allow(null, '')
                .optional(),

            location: Joi.string()
                .required()
                .messages({
                    'any.required': 'Location is required'
                })
        });

        return schema.validate(data, { abortEarly: true });
    }

    validateUpdateCafe(data) {
        const schema = Joi.object({
            name: Joi.string()
                .min(6)
                .max(10)
                .optional()
                .messages({
                    'string.min': 'Name must be at least 6 characters long',
                    'string.max': 'Name cannot exceed 10 characters'
                }),

            description: Joi.string()
                .max(256)
                .optional()
                .messages({
                    'string.max': 'Description cannot exceed 256 characters'
                }),

            logo: Joi.string()
                .allow(null, '')
                .optional(),

            location: Joi.string()
                .optional()
        });

        return schema.validate(data, { abortEarly: true });
    }
}

module.exports = new CafeValidator();