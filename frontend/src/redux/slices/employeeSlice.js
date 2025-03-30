import { createSlice } from '@reduxjs/toolkit';
import {
    fetchEmployees,
    fetchEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} from '../thunks/employeeThunks';

/**
 * Initial state for the employees slice
 */
const initialState = {
    employees: [],
    selectedEmployee: null,
    originalEmployeeData: null, // Added to store original data for comparison
    loading: false,
    error: null,
    filter: {
        cafeId: '',
    },
};

/**
 * Employee slice with reducers for all employee-related actions
 */
const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        setCafeFilter: (state, action) => {
            state.filter.cafeId = action.payload;
        },
        clearSelectedEmployee: (state) => {
            state.selectedEmployee = null;
            state.originalEmployeeData = null;
        },
        clearEmployeeError: (state) => {
            state.error = null;
        },
        // Add this reducer to handle storing original employee data
        setSelectedEmployeeWithOriginal: (state, action) => {
            state.selectedEmployee = action.payload;
            // Store a full copy to compare later when updating
            state.originalEmployeeData = { ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all employees
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch employees';
            })

            // Fetch employee by ID
            .addCase(fetchEmployeeById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedEmployee = action.payload;
                // Store a full copy to compare later when updating
                state.originalEmployeeData = { ...action.payload };
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch employee';
            })

            // Create employee
            .addCase(createEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees.push(action.payload);
            })
            .addCase(createEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to create employee';
            })

            // Update employee
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                // Update the employee in the employees array
                const index = state.employees.findIndex(employee => employee.id === action.payload.id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
                state.selectedEmployee = action.payload;
                // Clear the original data after successful update
                state.originalEmployeeData = null;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to update employee';
            })

            // Delete employee
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the employee from the employees array
                state.employees = state.employees.filter(employee => employee.id !== action.meta.arg);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete employee';
            });
    },
});

// Export actions
export const {
    setCafeFilter,
    clearSelectedEmployee,
    clearEmployeeError,
    setSelectedEmployeeWithOriginal
} = employeeSlice.actions;

// Export selectors
export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployeeById = (state, employeeId) =>
    state.employees.employees.find(employee => employee.id === employeeId);
export const selectSelectedEmployee = (state) => state.employees.selectedEmployee;
export const selectOriginalEmployeeData = (state) => state.employees.originalEmployeeData;
export const selectEmployeeLoading = (state) => state.employees.loading;
export const selectEmployeeError = (state) => state.employees.error;
export const selectCafeFilter = (state) => state.employees.filter.cafeId;

// Export reducer
export default employeeSlice.reducer;