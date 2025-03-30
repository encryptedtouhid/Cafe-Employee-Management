import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Create Axios instance with base configuration
 */
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Employee API service with methods for CRUD operations
 */
const employeeApi = {
    /**
     * Get all employees with optional cafe filter
     * @param {string} cafeId - Optional cafe ID for filtering
     * @returns {Promise<Array>} - List of employees
     */
    getAllEmployees: async (cafeId = null) => {
        try {
            const url = cafeId ? `/employees?cafe=${cafeId}` : '/employees';
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Get a specific employee by ID
     * @param {string} id - Employee ID
     * @returns {Promise<Object>} - Employee data
     */
    getEmployeeById: async (id) => {
        try {
            const response = await api.get(`/employees/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Create a new employee
     * @param {Object} employeeData - Employee data to create
     * @returns {Promise<Object>} - Created employee data
     */
    createEmployee: async (employeeData) => {
        try {
            const response = await api.post('/employee', employeeData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Update an existing employee
     * @param {string} id - Employee ID
     * @param {Object} employeeData - Updated employee data
     * @returns {Promise<Object>} - Updated employee data
     */
    updateEmployee: async (id, employeeData) => {
        try {
            const response = await api.put(`/employee/${id}`, employeeData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Delete an employee
     * @param {string} id - Employee ID
     * @returns {Promise<Object>} - Response data
     */
    deleteEmployee: async (id) => {
        try {
            const response = await api.delete(`/employee/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default employeeApi;