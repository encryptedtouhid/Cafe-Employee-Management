const Joi = require('joi');

class EmployeeValidator {
    validateCreateEmployee(data) {
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

            email_address: Joi.string()
                .email()
                .required()
                .messages({
                    'string.email': 'Invalid email format',
                    'any.required': 'Email address is required'
                }),

            phone_number: Joi.string()
                .pattern(/^[89]\d{7}$/)
                .required()
                .messages({
                    'string.pattern.base': 'Phone number must start with 8 or 9 and have 8 digits',
                    'any.required': 'Phone number is required'
                }),

            gender: Joi.string()
                .valid('Male', 'Female')
                .required()
                .messages({
                    'any.only': 'Gender must be either Male or Female',
                    'any.required': 'Gender is required'
                }),

            cafeId: Joi.string()
                .uuid()
                .allow(null)
                .optional()
                .messages({
                    'string.guid': 'Invalid cafe ID format'
                })
        });

        return schema.validate(data, { abortEarly: true });
    }

    validateUpdateEmployee(data) {
        const schema = Joi.object({
            name: Joi.string()
                .min(6)
                .max(10)
                .optional()
                .messages({
                    'string.min': 'Name must be at least 6 characters long',
                    'string.max': 'Name cannot exceed 10 characters'
                }),

            email_address: Joi.string()
                .email()
                .optional()
                .messages({
                    'string.email': 'Invalid email format'
                }),

            phone_number: Joi.string()
                .pattern(/^[89]\d{7}$/)
                .optional()
                .messages({
                    'string.pattern.base': 'Phone number must start with 8 or 9 and have 8 digits'
                }),

            gender: Joi.string()
                .valid('Male', 'Female')
                .optional()
                .messages({
                    'any.only': 'Gender must be either Male or Female'
                }),

            cafeId: Joi.string()
                .uuid()
                .allow(null)
                .optional()
                .messages({
                    'string.guid': 'Invalid cafe ID format'
                })
        });

        return schema.validate(data, { abortEarly: true });
    }
}

module.exports = new EmployeeValidator();