const cafeRepository = require('../repositories/cafeRepository');
const { ValidationError } = require('sequelize');

class CafeService {
  async getAllCafes(location) {
    try {
      return await cafeRepository.findAll(location);
    } catch (error) {
      throw error;
    }
  }

  async getCafeById(id) {
    try {
      const cafe = await cafeRepository.findById(id);
      if (!cafe) {
        const error = new Error('Cafe not found');
        error.statusCode = 404;
        throw error;
      }
      return cafe;
    } catch (error) {
      throw error;
    }
  }

  async createCafe(cafeData) {
    try {
      return await cafeRepository.create(cafeData);
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationError = new Error(error.errors[0].message);
        validationError.statusCode = 400;
        throw validationError;
      }
      throw error;
    }
  }

  async updateCafe(id, cafeData) {
    try {
      const updatedCafe = await cafeRepository.update(id, cafeData);
      if (!updatedCafe) {
        const error = new Error('Cafe not found');
        error.statusCode = 404;
        throw error;
      }
      return updatedCafe;
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationError = new Error(error.errors[0].message);
        validationError.statusCode = 400;
        throw validationError;
      }
      throw error;
    }
  }

  async deleteCafe(id) {
    try {
      const result = await cafeRepository.delete(id);
      if (!result) {
        const error = new Error('Cafe not found');
        error.statusCode = 404;
        throw error;
      }
      return { success: true, message: 'Cafe deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CafeService();