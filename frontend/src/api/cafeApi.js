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
 * Updated to match Swagger documentation
 */
const cafeApi = {
    /**
     * Get all cafes with optional location filter
     * @param {string} location - Optional location filter
     * @returns {Promise<Array>} - List of cafes
     */
    getAllCafes: async (location = null) => {
        try {
            const url = location ? `/cafes?location=${encodeURIComponent(location)}` : '/cafes';
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
            // Validate required fields according to Swagger definition
            if (!cafeData.name || cafeData.name.length < 6 || cafeData.name.length > 10) {
                throw new Error('Name must be between 6-10 characters');
            }

            if (!cafeData.description || cafeData.description.length > 256) {
                throw new Error('Description is required and cannot exceed 256 characters');
            }

            if (!cafeData.location) {
                throw new Error('Location is required');
            }

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
                const response = await api.post('/cafe', {
                    name: cafeData.name,
                    description: cafeData.description,
                    location: cafeData.location,
                    // Don't include logo if it's null/undefined
                    ...(cafeData.logo && { logo: cafeData.logo })
                });
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
            // Client-side validation for update
            if (cafeData.name && (cafeData.name.length < 6 || cafeData.name.length > 10)) {
                throw new Error('Name must be between 6-10 characters');
            }

            if (cafeData.description && cafeData.description.length > 256) {
                throw new Error('Description cannot exceed 256 characters');
            }

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