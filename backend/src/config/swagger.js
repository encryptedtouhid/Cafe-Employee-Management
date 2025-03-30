const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const logger = require('../utils/logger');

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Café & Staff Management API',
            version: '1.0.0',
            description: 'API for managing cafés and their employees',
            contact: {
                name: 'API Support'
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Development server'
                }
            ]
        },
        components: {
            schemas: {
                Cafe: {
                    type: 'object',
                    required: ['name', 'description', 'location'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'UUID of the café',
                            example: '550e8400-e29b-41d4-a716-446655440000'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the café',
                            example: 'JavaBeans',
                            minLength: 6,
                            maxLength: 10
                        },
                        description: {
                            type: 'string',
                            description: 'A short description of the café',
                            example: 'A cozy café specializing in premium coffee',
                            maxLength: 256
                        },
                        logo: {
                            type: 'string',
                            description: 'Logo image path',
                            example: 'uploads/logos/cafe-logo.jpg',
                            nullable: true
                        },
                        location: {
                            type: 'string',
                            description: 'Location of the café',
                            example: 'Central'
                        },
                        employees: {
                            type: 'integer',
                            description: 'Number of employees',
                            example: 5
                        }
                    }
                },
                Employee: {
                    type: 'object',
                    required: ['name', 'email_address', 'phone_number', 'gender'],
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique employee identifier',
                            example: 'UIABC1234'
                        },
                        name: {
                            type: 'string',
                            description: 'Name of the employee',
                            example: 'John Doe',
                            minLength: 6,
                            maxLength: 10
                        },
                        email_address: {
                            type: 'string',
                            format: 'email',
                            description: 'Email address of the employee',
                            example: 'john.doe@example.com'
                        },
                        phone_number: {
                            type: 'string',
                            description: 'Phone number of the employee',
                            example: '98765432',
                            pattern: '^[89]\\d{7}$'
                        },
                        gender: {
                            type: 'string',
                            enum: ['Male', 'Female'],
                            description: 'Gender of the employee',
                            example: 'Male'
                        },
                        days_worked: {
                            type: 'integer',
                            description: 'Number of days the employee has worked',
                            example: 45
                        },
                        cafe: {
                            type: 'string',
                            description: 'Café name that the employee is under',
                            example: 'JavaBeans',
                            nullable: true
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false
                        },
                        error: {
                            type: 'object',
                            properties: {
                                message: {
                                    type: 'string',
                                    example: 'Error message'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'] // Path to the API routes files
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configure Express to use Swagger UI
const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }'
    }));

    logger.info('Swagger documentation available at /api-docs');
};

module.exports = {
    setupSwagger
};