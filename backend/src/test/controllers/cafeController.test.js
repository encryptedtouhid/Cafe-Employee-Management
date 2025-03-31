const cafeController = require('../../controllers/cafeController'); // Adjust path as needed
const cafeMediator = require('../../mediators/cafeMediator');
const logger = require('../../utils/logger');

jest.mock('../../mediators/cafeMediator');
jest.mock('../../utils/logger');

describe('CafeController', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {},
            params: {},
            body: {},
            file: null
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('getCafes', () => {
        it('should successfully return a list of cafes', async () => {
            const cafesMock = [{ id: 1, name: 'Cafe One' }, { id: 2, name: 'Cafe Two' }];
            cafeMediator.getAllCafes.mockResolvedValue(cafesMock);
            req.query.location = 'New York';

            await cafeController.getCafes(req, res, next);

            expect(cafeMediator.getAllCafes).toHaveBeenCalledWith('New York');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(cafesMock);
        });

        it('should handle errors and call next with an error', async () => {
            const errorMock = new Error('Unable to fetch cafes');
            cafeMediator.getAllCafes.mockRejectedValue(errorMock);

            await cafeController.getCafes(req, res, next);

            expect(cafeMediator.getAllCafes).toHaveBeenCalled();
            expect(logger.error).toHaveBeenCalledWith(`Error getting cafes: ${errorMock.message}`);
            expect(next).toHaveBeenCalledWith(errorMock);
        });
    });
});