const EmployeeController = require('../../controllers/employeeController');
const employeeMediator = require('../../mediators/employeeMediator');
const logger = require('../../utils/logger');

jest.mock('../../mediators/employeeMediator');
jest.mock('../../utils/logger');

describe('EmployeeController', () => {
    let req, res, next;

    beforeEach(() => {
        req = { params: {}, query: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('getEmployees', () => {
        it('should return a list of employees when successful', async () => {
            const employees = [{ id: 1, name: 'John Doe' }];
            req.query.cafe = 'Cafe123';
            employeeMediator.getAllEmployees.mockResolvedValue(employees);

            await EmployeeController.getEmployees(req, res, next);

            expect(employeeMediator.getAllEmployees).toHaveBeenCalledWith('Cafe123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(employees);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('Error fetching employees');
            employeeMediator.getAllEmployees.mockRejectedValue(error);

            await EmployeeController.getEmployees(req, res, next);

            expect(logger.error).toHaveBeenCalledWith(`Error getting employees: ${error.message}`);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getEmployeeById', () => {
        it('should return an employee by ID when successful', async () => {
            const employee = { id: 1, name: 'John Doe' };
            req.params.id = '1';
            employeeMediator.getEmployeeById.mockResolvedValue(employee);

            await EmployeeController.getEmployeeById(req, res, next);

            expect(employeeMediator.getEmployeeById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(employee);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('Error fetching employee by ID');
            employeeMediator.getEmployeeById.mockRejectedValue(error);

            await EmployeeController.getEmployeeById(req, res, next);

            expect(logger.error).toHaveBeenCalledWith(`Error getting employee by ID: ${error.message}`);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('createEmployee', () => {
        it('should create a new employee and return it', async () => {
            const newEmployee = { id: 1, name: 'Jane Doe' };
            req.body = { name: 'Jane Doe' };
            employeeMediator.createEmployee.mockResolvedValue(newEmployee);

            await EmployeeController.createEmployee(req, res, next);

            expect(employeeMediator.createEmployee).toHaveBeenCalledWith({ name: 'Jane Doe' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newEmployee);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('Error creating employee');
            employeeMediator.createEmployee.mockRejectedValue(error);

            await EmployeeController.createEmployee(req, res, next);

            expect(logger.error).toHaveBeenCalledWith(`Error creating employee: ${error.message}`);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('updateEmployee', () => {
        it('should update an employee and return the updated employee', async () => {
            const updatedEmployee = { id: 1, name: 'Jane Updated' };
            req.params.id = '1';
            req.body = { name: 'Jane Updated' };
            employeeMediator.updateEmployee.mockResolvedValue(updatedEmployee);

            await EmployeeController.updateEmployee(req, res, next);

            expect(employeeMediator.updateEmployee).toHaveBeenCalledWith('1', { name: 'Jane Updated' });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedEmployee);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('Error updating employee');
            employeeMediator.updateEmployee.mockRejectedValue(error);

            await EmployeeController.updateEmployee(req, res, next);

            expect(logger.error).toHaveBeenCalledWith(`Error updating employee: ${error.message}`);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteEmployee', () => {
        it('should delete an employee and return a success message', async () => {
            const result = { message: 'Employee deleted successfully' };
            req.params.id = '1';
            employeeMediator.deleteEmployee.mockResolvedValue(result);

            await EmployeeController.deleteEmployee(req, res, next);

            expect(employeeMediator.deleteEmployee).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(result);
        });

        it('should call next with error on failure', async () => {
            const error = new Error('Error deleting employee');
            employeeMediator.deleteEmployee.mockRejectedValue(error);

            await EmployeeController.deleteEmployee(req, res, next);

            expect(logger.error).toHaveBeenCalledWith(`Error deleting employee: ${error.message}`);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});