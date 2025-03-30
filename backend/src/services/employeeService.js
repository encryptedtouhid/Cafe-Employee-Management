const employeeRepository = require('../repositories/employeeRepository');
const cafeRepository = require('../repositories/cafeRepository');
const { ValidationError } = require('sequelize');

class EmployeeService {
  async getAllEmployees(cafeId) {
    try {
      if (cafeId) {
        // Verify cafe exists
        const cafe = await cafeRepository.findById(cafeId);
        if (!cafe) {
          const error = new Error('Cafe not found');
          error.statusCode = 404;
          throw error;
        }
      }

      return await employeeRepository.findAll(cafeId);
    } catch (error) {
      throw error;
    }
  }

  async getEmployeeById(id) {
    try {
      const employee = await employeeRepository.findById(id);

      if (!employee) {
        const error = new Error('Employee not found');
        error.statusCode = 404;
        throw error;
      }

      // The repository now correctly returns formatted data with cafe name
      return employee;
    } catch (error) {
      throw error;
    }
  }

  async createEmployee(employeeData, cafeId) {
    try {
      // Verify cafe exists if provided
      if (cafeId) {
        const cafe = await cafeRepository.findById(cafeId);
        if (!cafe) {
          const error = new Error('Cafe not found');
          error.statusCode = 404;
          throw error;
        }
      }

      return await employeeRepository.create(employeeData, cafeId);
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationError = new Error(error.errors[0].message);
        validationError.statusCode = 400;
        throw validationError;
      }
      throw error;
    }
  }

  async updateEmployee(id, employeeData, cafeId) {
    try {
      // Verify cafe exists if provided
      if (cafeId) {
        const cafe = await cafeRepository.findById(cafeId);
        if (!cafe) {
          const error = new Error('Cafe not found');
          error.statusCode = 404;
          throw error;
        }
      }

      const updatedEmployee = await employeeRepository.update(id, employeeData, cafeId);
      if (!updatedEmployee) {
        const error = new Error('Employee not found');
        error.statusCode = 404;
        throw error;
      }

      return updatedEmployee;
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationError = new Error(error.errors[0].message);
        validationError.statusCode = 400;
        throw validationError;
      }
      throw error;
    }
  }

  async deleteEmployee(id) {
    try {
      const result = await employeeRepository.delete(id);
      if (!result) {
        const error = new Error('Employee not found');
        error.statusCode = 404;
        throw error;
      }
      return { success: true, message: 'Employee deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new EmployeeService();