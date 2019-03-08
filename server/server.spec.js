const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('GET /', () => {
        it('should return 200 ok', async () => {
            const resp = await request(server).get('/');

            expect(resp.status).toBe(200);
        });

        it('should return JSON', async () => {
            const resp = await request(server).get('/');

            expect(resp.type).toBe('application/json')
        });

        it(`should return {message: 'It\'s Working !!'}`, async () => {
            const resp = await request(server).get('/');

            expect(resp.body).toEqual({
                message: 'It\'s Working !!'
            });
        });
    });
});