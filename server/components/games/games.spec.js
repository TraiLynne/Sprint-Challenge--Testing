const request = require('supertest');
const router = require('../../server');

const gamesModel = require('./gamesModel');
const db = require('../../../db/dbConfig');

describe('Games', () => {
    describe('Game Model', () => {
        describe('CREATE', () => {
            afterEach(async () => {
                await db('games').truncate();
            });

            it('should be defined', () => {
                expect(gamesModel.create).toBeDefined()
            });

            it('should insert the provided game into the DB', async () => {
                await gamesModel.create({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980 //
                });

                const games = await db('games');

                expect(games).toHaveLength(1)
            });

            it('should return the provided game into the DB', async () => {
                let game = await gamesModel.create({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980 //
                });

                expect(game.title).toBe('Pacman');
                expect(game.genre).toBe('Arcade');
                expect(game.releaseYear).toBe(1980);
            });
        });

        describe('READ', () => {
            describe('Read All', () => {
                beforeAll(async () => {
                    await gamesModel.create({
                        title: 'Pacman',
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    await gamesModel.create({
                        title: 'Monopoly',
                        genre: 'Board',
                        releaseYear: 1935
                    });

                    await gamesModel.create({
                        title: 'The Game of Life',
                        genre: 'Board',
                        releaseYear: 1860
                    });

                    await gamesModel.create({
                        title: 'Basketball',
                        genre: 'sport',
                        releaseYear: 1891
                    });

                });

                it('should be defined', () => {
                    expect(gamesModel.readAll).toBeDefined();
                });

                it('should return the correct number of records', async () => {
                    let games = await gamesModel.readAll();

                    expect(games).toHaveLength(4);

                    await gamesModel.create({
                        title: 'Trouble',
                        genre: 'board',
                        releaseYear: 1965
                    });

                    games = await gamesModel.readAll();

                    expect(games).toHaveLength(5);
                });

                it('should return an array', async () => {
                    let games = await gamesModel.readAll();
                    expect(typeof(games)).toBe('object');
                });
            });

            describe('Read One', () => {
                
            });
        });

        describe('UPDATE', () => {
            
        });

        describe('DESTROY', () => {
            
        });
    });

    describe('Game Router', () => {
        describe('POST /', () => {
            afterEach(async () => {
                await db('games').truncate();
            });

            describe('General expectations', () => {
                it('should return JSON', async () => {
                    const resp = await request(router).post('/api/games/').send({
                        title: 'Pacman',
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.type).toBe('application/json')
                });
            });

            describe('Success', () => {
                it('should return 201', async () => {
                    const resp = await request(router).post('/api/games/').send({
                        title: 'Pacman',
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.status).toBe(201);
                });
    
                it('should return the games data', async () => {
                    const resp = await request(router).post('/api/games/').send({
                        title: 'Pacman',
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.body.title).toBe('Pacman');
                    expect(resp.body.genre).toBe('Arcade');
                    expect(resp.body.releaseYear).toBe(1980);
                });
                
            });

            describe('Incomplete', () => {
                it('should return 422', async () => {
                    let resp = await request(router).post('/api/games/').send({
                        title: 'Pacman',
                        releaseYear: 1980
                    });

                    expect(resp.status).toBe(422);

                    resp = await request(router).post('/api/games/').send({
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.status).toBe(422);
                });

                it('should return an errorMessage property', async () => {
                    let resp = await request(router).post('/api/games/').send({
                        title: 'Pacman',
                        releaseYear: 1980
                    });

                    expect(resp.body.errorMessage).toBeDefined();

                    resp = await request(router).post('/api/games/').send({
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.body.errorMessage).toBeDefined();
                })
            });

            describe('Game Already Exists', () => {
                it('should return 405', async () => {
                    let resp = await request(router).post('/api/games/').send({
                        title: 'Pacman',
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.status).toBe(201);

                    resp = await request(router).post('/api/games/').send({
                        title: 'Pacman',
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.status).toBe(405)
                });
            });
        });

        describe('GET /', () => {
            beforeAll(async () => {
                await gamesModel.create({
                    title: 'Pacman',
                    genre: 'Arcade',
                    releaseYear: 1980
                });

                await gamesModel.create({
                    title: 'Monopoly',
                    genre: 'Board',
                    releaseYear: 1935
                });

                await gamesModel.create({
                    title: 'The Game of Life',
                    genre: 'Board',
                    releaseYear: 1860
                });

                await gamesModel.create({
                    title: 'Basketball',
                    genre: 'sport',
                    releaseYear: 1891
                });

            });
            afterAll(async () => {
                await db('games').truncate();
            });
            it('should return an Array', async () => {
                let resp = await request(router).get('/api/games/');

                expect(typeof(resp.body)).toBe('object');
            });

            it('should return JSON', async () => {
                let resp = await request(router).get('/api/games/');

                expect(resp.type).toBe('application/json');
            });
            
            it('should return 200 ok', async () => {
                let resp = await request(router).get('/api/games/');

                expect(resp.status).toBe(200);
            });
        });
    });
});