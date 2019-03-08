const request = require('supertest');

const mainRouter = require('../server');

describe('Main Router', () => {
    describe('GET /', () => {
        it('should return 200 ok', async () => {
            const response = await request(mainRouter).get('/api/');

            expect(response.status).toBe(200);
        });

        it('should should return JSON', async () => {
            const response = await request(mainRouter).get('/api/');

            expect(response.type).toBe('application/json');
        });

        it(`should should return {message: 'Welcome to the Main API'}`, async () => {
            const response = await request(mainRouter).get('/api/');

            expect(response.body).toEqual({
                message: 'Welcome to the Main API'
            });
        });
    });
});