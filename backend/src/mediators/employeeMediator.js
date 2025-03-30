const employeeService = require('../services/employeeService');
const employeeValidator = require('../validators/employeeValidator');

class EmployeeMediator {
    async getAllEmployees(cafeId) {
        try {
            return await employeeService.getAllEmployees(cafeId);
        } catch (error) {
            throw error;
        }
    }

    async getEmployeeById(id) {
        try {
            return await employeeService.getEmployeeById(id);
        } catch (error) {
            throw error;
        }
    }

    async createEmployee(employeeData) {
        try {
            // Validate input data
            const { error, value } = employeeValidator.validateCreateEmployee(employeeData);
            if (error) {
                const validationError = new Error(error.details[0].message);
                validationError.statusCode = 400;
                throw validationError;
            }

            // Extract cafeId from the request body
            const { cafeId, ...employeeDetails } = value;

            return await employeeService.createEmployee(employeeDetails, cafeId);
        } catch (error) {
            throw error;
        }
    }

    async updateEmployee(id, employeeData) {
        try {
            // Validate input data
            const { error, value } = employeeValidator.validateUpdateEmployee(employeeData);
            if (error) {
                const validationError = new Error(error.details[0].message);
                validationError.statusCode = 400;
                throw validationError;
            }

            // Extract cafeId from the request body
            const { cafeId, ...employeeDetails } = value;

            return await employeeService.updateEmployee(id, employeeDetails, cafeId);
        } catch (error) {
            throw error;
        }
    }

    async deleteEmployee(id) {
        try {
            return await employeeService.deleteEmployee(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new EmployeeMediator();