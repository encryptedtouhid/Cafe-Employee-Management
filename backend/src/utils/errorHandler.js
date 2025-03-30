const logger = require('./logger');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    logger.error(`Error: ${err.message}`);
    logger.debug(err.stack);

    // Default error status and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    // Send appropriate response
    res.status(statusCode).json({
        success: false,
        error: {
            message,
            // Include stack trace in development environment only
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
};

/**
 * Handle 404 Not Found errors
 */
const notFoundHandler = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

module.exports = {
    errorHandler,
    notFoundHandler
};