import axios from 'axios';

// Define the base API URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Define the media/assets server URL (used for images)
const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || BASE_URL;

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
 * Updated to correctly handle location filtering and image URLs
 */
const cafeApi = {
    /**
     * Get all cafes with optional location filter
     * @param {string} location - Optional location filter
     * @returns {Promise<Array>} - List of cafes with properly formatted image URLs
     */
    getAllCafes: async (location = '') => {
        try {
            // Build query parameters for filtering
            const params = new URLSearchParams();
            if (location && location.trim()) {
                params.append('location', location.trim());
            }

            // Make API request with query parameters
            const queryString = params.toString();
            const url = queryString ? `/cafes?${queryString}` : '/cafes';
            const response = await api.get(url);

            // Process response data to add full URLs to images
            const cafes = response.data.map(cafe => ({
                ...cafe,
                logo: cafe.logo ? `${MEDIA_URL}/${cafe.logo.replace(/^\//, '')}` : null
            }));

            return cafes;
        } catch (error) {
            console.error('Error fetching cafes:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Get a specific cafe by ID
     * @param {string} id - Cafe ID
     * @returns {Promise<Object>} - Cafe data with properly formatted image URL
     */
    getCafeById: async (id) => {
        try {
            const response = await api.get(`/cafes/${id}`);

            // Process cafe data to add full URL to image
            const cafe = {
                ...response.data,
                logo: response.data.logo ? `${MEDIA_URL}/${response.data.logo.replace(/^\//, '')}` : null
            };

            return cafe;
        } catch (error) {
            console.error('Error fetching cafe by ID:', error);
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

                // Format the response with full image URL
                const createdCafe = {
                    ...response.data,
                    logo: response.data.logo ? `${MEDIA_URL}/${response.data.logo.replace(/^\//, '')}` : null
                };

                return createdCafe;
            } else {
                // Regular JSON request without file
                const response = await api.post('/cafe', {
                    name: cafeData.name,
                    description: cafeData.description,
                    location: cafeData.location,
                    // Don't include logo if it's null/undefined
                    ...(cafeData.logo && { logo: cafeData.logo })
                });

                // Format the response with full image URL
                const createdCafe = {
                    ...response.data,
                    logo: response.data.logo ? `${MEDIA_URL}/${response.data.logo.replace(/^\//, '')}` : null
                };

                return createdCafe;
            }
        } catch (error) {
            console.error('Error creating cafe:', error);
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

                // Format the response with full image URL
                const updatedCafe = {
                    ...response.data,
                    logo: response.data.logo ? `${MEDIA_URL}/${response.data.logo.replace(/^\//, '')}` : null
                };

                return updatedCafe;
            } else {
                // Regular JSON request without file
                const response = await api.put(`/cafe/${id}`, cafeData);

                // Format the response with full image URL
                const updatedCafe = {
                    ...response.data,
                    logo: response.data.logo ? `${MEDIA_URL}/${response.data.logo.replace(/^\//, '')}` : null
                };

                return updatedCafe;
            }
        } catch (error) {
            console.error('Error updating cafe:', error);
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
            console.error('Error deleting cafe:', error);
            throw error.response?.data || error;
        }
    },

    /**
     * Helper method to get the full image URL
     * @param {string} relativePath - Relative path of the image
     * @returns {string} - Full URL of the image
     */
    getImageUrl: (relativePath) => {
        if (!relativePath) return null;
        return `${MEDIA_URL}/${relativePath.replace(/^\//, '')}`;
    }
};

export default cafeApi;