import { createAsyncThunk } from '@reduxjs/toolkit';
import employeeApi from '../../api/employeeApi';

/**
 * Fetch all employees with optional cafe filter
 */
export const fetchEmployees = createAsyncThunk(
    'employees/fetchEmployees',
    async (cafeId, { rejectWithValue }) => {
        try {
            return await employeeApi.getAllEmployees(cafeId);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch employees');
        }
    }
);

/**
 * Fetch an employee by ID
 */
export const fetchEmployeeById = createAsyncThunk(
    'employees/fetchEmployeeById',
    async (id, { rejectWithValue }) => {
        try {
            return await employeeApi.getEmployeeById(id);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to fetch employee');
        }
    }
);

/**
 * Create a new employee
 */
export const createEmployee = createAsyncThunk(
    'employees/createEmployee',
    async (employeeData, { rejectWithValue }) => {
        try {
            return await employeeApi.createEmployee(employeeData);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to create employee');
        }
    }
);

/**
 * Update an existing employee
 */
export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async ({ id, employeeData }, { getState, rejectWithValue }) => {
        try {
            // Get the original employee data from state
            const state = getState();
            const originalEmployee = state.employees.originalEmployeeData || state.employees.selectedEmployee;

            // Call API with both new data and original data for comparison
            return await employeeApi.updateEmployee(id, employeeData, originalEmployee);
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to update employee');
        }
    }
);

/**
 * Delete an employee
 */
export const deleteEmployee = createAsyncThunk(
    'employees/deleteEmployee',
    async (id, { rejectWithValue }) => {
        try {
            await employeeApi.deleteEmployee(id);
            return id; // Return the ID for removing from state
        } catch (error) {
            return rejectWithValue(error.message || 'Failed to delete employee');
        }
    }
);