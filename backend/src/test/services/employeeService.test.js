const EmployeeService = require('../../services/EmployeeService');
const employeeRepository = require('../../repositories/employeeRepository');
const cafeRepository = require('../../repositories/cafeRepository');
const { ValidationError } = require('sequelize');

// Mock the repositories
jest.mock('../../repositories/employeeRepository');
jest.mock('../../repositories/cafeRepository');

describe('EmployeeService', () => {
    describe('getAllEmployees', () => {
        it('should return all employees for a specific cafe when cafeId is provided', async () => {
            const employees = [{ id: 1, name: 'John Doe' }];
            const cafeId = 1;
            cafeRepository.findById.mockResolvedValue({ id: cafeId, name: 'Cafe A' });
            employeeRepository.findAll.mockResolvedValue(employees);

            const result = await EmployeeService.getAllEmployees(cafeId);

            expect(cafeRepository.findById).toHaveBeenCalledWith(cafeId);
            expect(employeeRepository.findAll).toHaveBeenCalledWith(cafeId);
            expect(result).toEqual(employees);
        });

        it('should throw a 404 error if the cafe does not exist', async () => {
            const cafeId = 1;
            cafeRepository.findById.mockResolvedValue(null);

            await expect(EmployeeService.getAllEmployees(cafeId)).rejects.toThrow('Cafe not found');
            await expect(EmployeeService.getAllEmployees(cafeId)).rejects.toHaveProperty('statusCode', 404);
        });

        it('should return all employees when no cafeId is provided', async () => {
            const employees = [{ id: 1, name: 'John Doe' }];
            employeeRepository.findAll.mockResolvedValue(employees);

            const result = await EmployeeService.getAllEmployees();

            expect(employeeRepository.findAll).toHaveBeenCalledWith(undefined);
            expect(result).toEqual(employees);
        });

        it('should throw an error if employeeRepository.findAll fails', async () => {
            const error = new Error('Database error');
            employeeRepository.findAll.mockRejectedValue(error);

            await expect(EmployeeService.getAllEmployees()).rejects.toThrow('Database error');
        });
    });

    describe('getEmployeeById', () => {
        it('should return an employee by ID when found', async () => {
            const employee = { id: 1, name: 'John Doe' };
            employeeRepository.findById.mockResolvedValue(employee);

            const result = await EmployeeService.getEmployeeById(1);

            expect(employeeRepository.findById).toHaveBeenCalledWith(1);
            expect(result).toEqual(employee);
        });

        it('should throw a 404 error if the employee does not exist', async () => {
            employeeRepository.findById.mockResolvedValue(null);

            await expect(EmployeeService.getEmployeeById(1)).rejects.toThrow('Employee not found');
            await expect(EmployeeService.getEmployeeById(1)).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw an error if employeeRepository.findById fails', async () => {
            const error = new Error('Database error');
            employeeRepository.findById.mockRejectedValue(error);

            await expect(EmployeeService.getEmployeeById(1)).rejects.toThrow('Database error');
        });
    });

    describe('createEmployee', () => {
        it('should create a new employee if the cafe exists', async () => {
            const employeeData = { name: 'Jane Doe', position: 'Barista' };
            const cafeId = 1;
            const createdEmployee = { id: 1, ...employeeData };
            cafeRepository.findById.mockResolvedValue({ id: cafeId, name: 'Cafe A' });
            employeeRepository.create.mockResolvedValue(createdEmployee);

            const result = await EmployeeService.createEmployee(employeeData, cafeId);

            expect(cafeRepository.findById).toHaveBeenCalledWith(cafeId);
            expect(employeeRepository.create).toHaveBeenCalledWith(employeeData, cafeId);
            expect(result).toEqual(createdEmployee);
        });

        it('should throw a 404 error if the cafe does not exist', async () => {
            const employeeData = { name: 'Jane Doe', position: 'Barista' };
            const cafeId = 1;
            cafeRepository.findById.mockResolvedValue(null);

            await expect(EmployeeService.createEmployee(employeeData, cafeId)).rejects.toThrow('Cafe not found');
            await expect(EmployeeService.createEmployee(employeeData, cafeId)).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw a 400 error if ValidationError occurs', async () => {
            const error = new ValidationError('Validation error', [
                { message: 'Name is required' },
            ]);
            employeeRepository.create.mockRejectedValue(error);

            await expect(EmployeeService.createEmployee({})).rejects.toThrow('Name is required');
            await expect(EmployeeService.createEmployee({})).rejects.toHaveProperty('statusCode', 400);
        });

        it('should throw an error if employeeRepository.create fails', async () => {
            const error = new Error('Database error');
            employeeRepository.create.mockRejectedValue(error);

            await expect(EmployeeService.createEmployee({ name: 'Jane Doe' })).rejects.toThrow('Database error');
        });
    });

    describe('updateEmployee', () => {
        it('should update an employee when the cafe exists', async () => {
            const employeeData = { name: 'Jane Updated', position: 'Manager' };
            const updatedEmployee = { id: 1, ...employeeData };
            const cafeId = 1;

            cafeRepository.findById.mockResolvedValue({ id: cafeId, name: 'Cafe A' });
            employeeRepository.update.mockResolvedValue(updatedEmployee);

            const result = await EmployeeService.updateEmployee(1, employeeData, cafeId);

            expect(cafeRepository.findById).toHaveBeenCalledWith(cafeId);
            expect(employeeRepository.update).toHaveBeenCalledWith(1, employeeData, cafeId);
            expect(result).toEqual(updatedEmployee);
        });

        it('should throw a 404 error if the employee does not exist', async () => {
            employeeRepository.update.mockResolvedValue(null);

            await expect(EmployeeService.updateEmployee(1, {})).rejects.toThrow('Employee not found');
            await expect(EmployeeService.updateEmployee(1, {})).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw a 400 error if ValidationError occurs', async () => {
            const error = new ValidationError('Validation error', [
                { message: 'Name is required' },
            ]);
            employeeRepository.update.mockRejectedValue(error);

            await expect(EmployeeService.updateEmployee(1, {})).rejects.toThrow('Name is required');
            await expect(EmployeeService.updateEmployee(1, {})).rejects.toHaveProperty('statusCode', 400);
        });

        it('should throw an error if employeeRepository.update fails', async () => {
            const error = new Error('Database error');
            employeeRepository.update.mockRejectedValue(error);

            await expect(EmployeeService.updateEmployee(1, { name: 'Jane Updated' })).rejects.toThrow('Database error');
        });
    });

    describe('deleteEmployee', () => {
        it('should delete an employee and return a success message', async () => {
            employeeRepository.delete.mockResolvedValue(true);

            const result = await EmployeeService.deleteEmployee(1);

            expect(employeeRepository.delete).toHaveBeenCalledWith(1);
            expect(result).toEqual({ success: true, message: 'Employee deleted successfully' });
        });

        it('should throw a 404 error if the employee does not exist', async () => {
            employeeRepository.delete.mockResolvedValue(false);

            await expect(EmployeeService.deleteEmployee(1)).rejects.toThrow('Employee not found');
            await expect(EmployeeService.deleteEmployee(1)).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw an error if employeeRepository.delete fails', async () => {
            const error = new Error('Database error');
            employeeRepository.delete.mockRejectedValue(error);

            await expect(EmployeeService.deleteEmployee(1)).rejects.toThrow('Database error');
        });
    });
});