const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees or filter by cafe
 *     description: Retrieve a list of employees, optionally filtered by cafe. Returns employees sorted by the highest number of days worked.
 *     parameters:
 *       - in: query
 *         name: cafe
 *         schema:
 *           type: string
 *         description: Cafe ID to filter employees by
 *     responses:
 *       200:
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', employeeController.getEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get a specific employee by ID
 *     description: Retrieve detailed information about a specific employee by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee (UIXXXXXXX format)
 *     responses:
 *       200:
 *         description: Detailed employee information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', employeeController.getEmployeeById);

/**
 * @swagger
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     description: Create a new employee and optionally assign them to a cafe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email_address
 *               - phone_number
 *               - gender
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the employee (6-10 characters)
 *                 example: John Doe
 *               email_address:
 *                 type: string
 *                 format: email
 *                 description: Email address of the employee
 *                 example: john.doe@example.com
 *               phone_number:
 *                 type: string
 *                 description: Phone number (starts with 8 or 9, 8 digits)
 *                 example: 98765432
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 description: Gender of the employee
 *                 example: Male
 *               cafeId:
 *                 type: string
 *                 description: UUID of the cafe to assign the employee to
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Cafe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', employeeController.createEmployee);

/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update an existing employee
 *     description: Update an existing employee's information and optionally change their cafe assignment
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee (UIXXXXXXX format)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the employee (6-10 characters)
 *                 example: Jane Smith
 *               email_address:
 *                 type: string
 *                 format: email
 *                 description: Email address of the employee
 *                 example: jane.smith@example.com
 *               phone_number:
 *                 type: string
 *                 description: Phone number (starts with 8 or 9, 8 digits)
 *                 example: 87654321
 *               gender:
 *                 type: string
 *                 enum: [Male, Female]
 *                 description: Gender of the employee
 *                 example: Female
 *               cafeId:
 *                 type: string
 *                 description: UUID of the cafe to assign the employee to
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Employee or cafe not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', employeeController.updateEmployee);

/**
 * @swagger
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Delete an employee from the system
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the employee (UIXXXXXXX format)
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;