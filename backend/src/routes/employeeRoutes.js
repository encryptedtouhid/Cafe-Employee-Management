const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// GET /employees - Get all employees or filter by cafe
router.get('/', employeeController.getEmployees);

// GET /employees/:id - Get a specific employee by ID
router.get('/:id', employeeController.getEmployeeById);

// POST /employee - Create a new employee
router.post('/', employeeController.createEmployee);

// PUT /employee/:id - Update an existing employee
router.put('/:id', employeeController.updateEmployee);

// DELETE /employee/:id - Delete an employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;