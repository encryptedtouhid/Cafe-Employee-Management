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
 * Cafe API service with methods for CRUD operations
 */
const cafeApi = {
    /**
     * Get all cafes with optional location filter
     * @param {string} location - Optional location filter
     * @returns {Promise<Array>} - List of cafes
     */
    getAllCafes: async (location = null) => {
        try {
            const url = location ? `/cafes?location=${location}` : '/cafes';
            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Get a specific cafe by ID
     * @param {string} id - Cafe ID
     * @returns {Promise<Object>} - Cafe data
     */
    getCafeById: async (id) => {
        try {
            const response = await api.get(`/cafes/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Create a new cafe
     * @param {Object} cafeData - Cafe data to create
     * @returns {Promise<Object>} - Created cafe data
     */
    createCafe: async (cafeData) => {
        try {
            // If cafeData contains a file, use FormData
            if (cafeData.logo instanceof File) {
                const formData = new FormData();
                formData.append('name', cafeData.name);
                formData.append('description', cafeData.description);
                formData.append('location', cafeData.location);
                formData.append('logo', cafeData.logo);

                const response = await api.post('/cafe', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data;
            } else {
                // Regular JSON request without file
                const response = await api.post('/cafe', cafeData);
                return response.data;
            }
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Update an existing cafe
     * @param {string} id - Cafe ID
     * @param {Object} cafeData - Updated cafe data
     * @returns {Promise<Object>} - Updated cafe data
     */
    updateCafe: async (id, cafeData) => {
        try {
            // If cafeData contains a file, use FormData
            if (cafeData.logo instanceof File) {
                const formData = new FormData();

                // Only append fields that are present
                if (cafeData.name) formData.append('name', cafeData.name);
                if (cafeData.description) formData.append('description', cafeData.description);
                if (cafeData.location) formData.append('location', cafeData.location);
                formData.append('logo', cafeData.logo);

                const response = await api.put(`/cafe/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data;
            } else {
                // Regular JSON request without file
                const response = await api.put(`/cafe/${id}`, cafeData);
                return response.data;
            }
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    /**
     * Delete a cafe
     * @param {string} id - Cafe ID
     * @returns {Promise<Object>} - Response data
     */
    deleteCafe: async (id) => {
        try {
            const response = await api.delete(`/cafe/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },
};

export default cafeApi;