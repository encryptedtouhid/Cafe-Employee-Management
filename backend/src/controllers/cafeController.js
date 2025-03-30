const cafeMediator = require('../mediators/cafeMediator');
const logger = require('../utils/logger');

class CafeController {
    async getCafes(req, res, next) {
        try {
            const { location } = req.query;
            const cafes = await cafeMediator.getAllCafes(location);
            res.status(200).json(cafes);
        } catch (error) {
            logger.error(`Error getting cafes: ${error.message}`);
            next(error);
        }
    }

    async getCafeById(req, res, next) {
        try {
            const { id } = req.params;
            const cafe = await cafeMediator.getCafeById(id);
            res.status(200).json(cafe);
        } catch (error) {
            logger.error(`Error getting cafe by ID: ${error.message}`);
            next(error);
        }
    }

    async createCafe(req, res, next) {
        try {
            const cafeData = req.body;

            // Handle file upload if present
            if (req.file) {
                cafeData.logo = req.file.path;
            }

            const newCafe = await cafeMediator.createCafe(cafeData);
            res.status(201).json(newCafe);
        } catch (error) {
            logger.error(`Error creating cafe: ${error.message}`);
            next(error);
        }
    }

    async updateCafe(req, res, next) {
        try {
            const { id } = req.params;
            const cafeData = req.body;

            // Handle file upload if present
            if (req.file) {
                cafeData.logo = req.file.path;
            }

            const updatedCafe = await cafeMediator.updateCafe(id, cafeData);
            res.status(200).json(updatedCafe);
        } catch (error) {
            logger.error(`Error updating cafe: ${error.message}`);
            next(error);
        }
    }

    async deleteCafe(req, res, next) {
        try {
            const { id } = req.params;
            const result = await cafeMediator.deleteCafe(id);
            res.status(200).json(result);
        } catch (error) {
            logger.error(`Error deleting cafe: ${error.message}`);
            next(error);
        }
    }
}

module.exports = new CafeController();