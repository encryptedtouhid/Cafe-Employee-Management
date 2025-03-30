/**
 * Utility functions for error handling in the frontend
 */

/**
 * Extract error message from an API error response
 * @param {Object} error - Error object from API call
 * @returns {string} - Extracted error message
 */
export const getErrorMessage = (error) => {
    // Handle network errors
    if (!error.response) {
        return 'Network error. Please check your internet connection.';
    }

    // Handle API error responses
    if (error.response?.data) {
        // Check if there's an error message in the response
        if (error.response.data.error?.message) {
            return error.response.data.error.message;
        }

        // Check for validation errors (array of errors)
        if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
            return error.response.data.errors[0].message || 'Validation failed';
        }

        // Check for simple message property
        if (error.response.data.message) {
            return error.response.data.message;
        }
    }

    // Handle specific HTTP status codes
    switch (error.response?.status) {
        case 400:
            return 'Bad request. Please check your input.';
        case 401:
            return 'Unauthorized. Please log in again.';
        case 403:
            return 'Forbidden. You do not have permission to perform this action.';
        case 404:
            return 'Not found. The requested resource does not exist.';
        case 422:
            return 'Validation failed. Please check your input.';
        case 500:
            return 'Server error. Please try again later.';
        default:
            return error.message || 'An unexpected error occurred.';
    }
};

/**
 * Group validation errors by field
 * @param {Array} errors - Array of validation errors
 * @returns {Object} - Errors grouped by field
 */
export const groupErrorsByField = (errors) => {
    if (!errors || !Array.isArray(errors)) {
        return {};
    }

    return errors.reduce((result, error) => {
        const field = error.field || 'general';
        if (!result[field]) {
            result[field] = [];
        }
        result[field].push(error.message);
        return result;
    }, {});
};

/**
 * Check if an error is a network error
 * @param {Object} error - Error object
 * @returns {boolean} - Whether it's a network error
 */
export const isNetworkError = (error) => {
    return !error.response && error.message === 'Network Error';
};

/**
 * Check if an error is an authentication error
 * @param {Object} error - Error object
 * @returns {boolean} - Whether it's an authentication error
 */
export const isAuthError = (error) => {
    return error.response?.status === 401;
};

/**
 * Check if an error is a validation error
 * @param {Object} error - Error object
 * @returns {boolean} - Whether it's a validation error
 */
export const isValidationError = (error) => {
    return error.response?.status === 422 ||
        (error.response?.data?.errors && Array.isArray(error.response.data.errors));
};

/**
 * Log error to console in development environment
 * @param {Object} error - Error object
 * @param {string} context - Context where the error occurred
 */
export const logError = (error, context = '') => {
    if (process.env.NODE_ENV !== 'production') {
        console.error(`Error ${context ? `in ${context}` : ''}:`, error);
    }
};

/**
 * Create a standardized error object
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @param {Object} data - Additional error data
 * @returns {Object} - Standardized error object
 */
export const createError = (message, status = 500, data = {}) => {
    return {
        message,
        status,
        data,
        timestamp: new Date().toISOString()
    };
};