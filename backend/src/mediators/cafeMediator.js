const cafeService = require('../services/cafeService');
const cafeValidator = require('../validators/cafeValidator');

class CafeMediator {
    async getAllCafes(location) {
        try {
            return await cafeService.getAllCafes(location);
        } catch (error) {
            throw error;
        }
    }

    async getCafeById(id) {
        try {
            return await cafeService.getCafeById(id);
        } catch (error) {
            throw error;
        }
    }

    async createCafe(cafeData) {
        try {
            // Validate input data
            const { error, value } = cafeValidator.validateCreateCafe(cafeData);
            if (error) {
                const validationError = new Error(error.details[0].message);
                validationError.statusCode = 400;
                throw validationError;
            }

            return await cafeService.createCafe(value);
        } catch (error) {
            throw error;
        }
    }

    async updateCafe(id, cafeData) {
        try {
            // Validate input data
            const { error, value } = cafeValidator.validateUpdateCafe(cafeData);
            if (error) {
                const validationError = new Error(error.details[0].message);
                validationError.statusCode = 400;
                throw validationError;
            }

            return await cafeService.updateCafe(id, value);
        } catch (error) {
            throw error;
        }
    }

    async deleteCafe(id) {
        try {
            return await cafeService.deleteCafe(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CafeMediator();