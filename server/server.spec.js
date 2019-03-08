const request = require('supertest');

const server = require('./server');

describe('server.js', () => {
    describe('GET /', () => {
        it('should return 200 ok', async () => {
            const resp = await request(server).get('/');

            expect(resp.status).toBe(200);
        });

        it('should return Text', () => {
            const resp = await request(server).get('/');

            expect(resp.type).toBe('text/html')
        });

        it('should return `Welcome to the Main API`', async () => {
            const resp = await request(server).get('/');

            expect(resp.body).toEqual('Welcome to the Main API');
        });
    });
});