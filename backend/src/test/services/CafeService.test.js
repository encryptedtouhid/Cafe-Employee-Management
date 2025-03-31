const CafeService = require('../../services/CafeService');
const cafeRepository = require('../../repositories/cafeRepository');
const { ValidationError } = require('sequelize');

jest.mock('../../repositories/cafeRepository');

describe('CafeService', () => {
    describe('getAllCafes', () => {
        it('should return a list of cafes when successful', async () => {
            const cafes = [{ id: 1, name: 'Cafe 1' }];
            cafeRepository.findAll.mockResolvedValue(cafes);

            const result = await CafeService.getAllCafes('New York');

            expect(cafeRepository.findAll).toHaveBeenCalledWith('New York');
            expect(result).toEqual(cafes);
        });

        it('should throw an error when cafeRepository.findAll fails', async () => {
            const error = new Error('Database error');
            cafeRepository.findAll.mockRejectedValue(error);

            await expect(CafeService.getAllCafes('New York')).rejects.toThrow('Database error');
        });
    });

    describe('getCafeById', () => {
        it('should return a cafe when it exists', async () => {
            const cafe = { id: 1, name: 'Cafe 1' };
            cafeRepository.findById.mockResolvedValue(cafe);

            const result = await CafeService.getCafeById(1);

            expect(cafeRepository.findById).toHaveBeenCalledWith(1);
            expect(result).toEqual(cafe);
        });

        it('should throw a 404 error when the cafe does not exist', async () => {
            cafeRepository.findById.mockResolvedValue(null);

            await expect(CafeService.getCafeById(1)).rejects.toThrow('Cafe not found');
            await expect(CafeService.getCafeById(1)).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw an error when cafeRepository.findById fails', async () => {
            const error = new Error('Database error');
            cafeRepository.findById.mockRejectedValue(error);

            await expect(CafeService.getCafeById(1)).rejects.toThrow('Database error');
        });
    });

    describe('createCafe', () => {
        it('should create and return a new cafe', async () => {
            const cafeData = { name: 'Cafe 1', location: 'NYC' };
            const newCafe = { id: 1, ...cafeData };
            cafeRepository.create.mockResolvedValue(newCafe);

            const result = await CafeService.createCafe(cafeData);

            expect(cafeRepository.create).toHaveBeenCalledWith(cafeData);
            expect(result).toEqual(newCafe);
        });

        it('should throw a 400 error when ValidationError occurs', async () => {
            const error = new ValidationError('Validation error', [
                { message: 'Name is required' },
            ]);
            cafeRepository.create.mockRejectedValue(error);

            await expect(CafeService.createCafe({})).rejects.toThrow('Name is required');
            await expect(CafeService.createCafe({})).rejects.toHaveProperty('statusCode', 400);
        });

        it('should throw an error when cafeRepository.create fails', async () => {
            const error = new Error('Database error');
            cafeRepository.create.mockRejectedValue(error);

            await expect(CafeService.createCafe({ name: 'Cafe 1' })).rejects.toThrow('Database error');
        });
    });

    describe('updateCafe', () => {
        it('should update and return the cafe when it exists', async () => {
            const cafeData = { name: 'Updated Cafe 1', location: 'NYC' };
            const updatedCafe = { id: 1, ...cafeData };
            cafeRepository.update.mockResolvedValue(updatedCafe);

            const result = await CafeService.updateCafe(1, cafeData);

            expect(cafeRepository.update).toHaveBeenCalledWith(1, cafeData);
            expect(result).toEqual(updatedCafe);
        });

        it('should throw a 404 error when the cafe does not exist', async () => {
            cafeRepository.update.mockResolvedValue(null);

            await expect(CafeService.updateCafe(1, { name: 'Name' })).rejects.toThrow('Cafe not found');
            await expect(CafeService.updateCafe(1, { name: 'Name' })).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw a 400 error when ValidationError occurs', async () => {
            const error = new ValidationError('Validation error', [
                { message: 'Name is required' },
            ]);
            cafeRepository.update.mockRejectedValue(error);

            await expect(CafeService.updateCafe(1, {})).rejects.toThrow('Name is required');
            await expect(CafeService.updateCafe(1, {})).rejects.toHaveProperty('statusCode', 400);
        });

        it('should throw an error when cafeRepository.update fails', async () => {
            const error = new Error('Database error');
            cafeRepository.update.mockRejectedValue(error);

            await expect(CafeService.updateCafe(1, { name: 'Name' })).rejects.toThrow('Database error');
        });
    });

    describe('deleteCafe', () => {
        it('should delete the cafe and return a success message if it exists', async () => {
            cafeRepository.delete.mockResolvedValue(true);

            const result = await CafeService.deleteCafe(1);

            expect(cafeRepository.delete).toHaveBeenCalledWith(1);
            expect(result).toEqual({ success: true, message: 'Cafe deleted successfully' });
        });

        it('should throw a 404 error when the cafe does not exist', async () => {
            cafeRepository.delete.mockResolvedValue(false);

            await expect(CafeService.deleteCafe(1)).rejects.toThrow('Cafe not found');
            await expect(CafeService.deleteCafe(1)).rejects.toHaveProperty('statusCode', 404);
        });

        it('should throw an error when cafeRepository.delete fails', async () => {
            const error = new Error('Database error');
            cafeRepository.delete.mockRejectedValue(error);

            await expect(CafeService.deleteCafe(1)).rejects.toThrow('Database error');
        });
    });
});