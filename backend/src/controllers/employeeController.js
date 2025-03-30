const employeeMediator = require('../mediators/employeeMediator');
const logger = require('../utils/logger');

class EmployeeController {
    async getEmployees(req, res, next) {
        try {
            const { cafe } = req.query;
            const employees = await employeeMediator.getAllEmployees(cafe);

            // Handle response
            res.status(200).json(employees);
        } catch (error) {
            logger.error(`Error getting employees: ${error.message}`);
            next(error);
        }
    }

    async getEmployeeById(req, res, next) {
        try {
            const { id } = req.params;
            const employee = await employeeMediator.getEmployeeById(id);

            // Handle response
            res.status(200).json(employee);
        } catch (error) {
            logger.error(`Error getting employee by ID: ${error.message}`);
            next(error);
        }
    }

    async createEmployee(req, res, next) {
        try {
            const employeeData = req.body;
            const newEmployee = await employeeMediator.createEmployee(employeeData);
            res.status(201).json(newEmployee);
        } catch (error) {
            logger.error(`Error creating employee: ${error.message}`);
            next(error);
        }
    }

    async updateEmployee(req, res, next) {
        try {
            const { id } = req.params;
            const employeeData = req.body;
            const updatedEmployee = await employeeMediator.updateEmployee(id, employeeData);
            res.status(200).json(updatedEmployee);
        } catch (error) {
            logger.error(`Error updating employee: ${error.message}`);
            next(error);
        }
    }

    async deleteEmployee(req, res, next) {
        try {
            const { id } = req.params;
            const result = await employeeMediator.deleteEmployee(id);
            res.status(200).json(result);
        } catch (error) {
            logger.error(`Error deleting employee: ${error.message}`);
            next(error);
        }
    }
}

module.exports = new EmployeeController();