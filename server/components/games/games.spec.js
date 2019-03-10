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
                it('should be defined', () => {
                    
                });

                it('should return the correct number of records', () => {
                    
                });
                it('should return an array', () => {
                    
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

                    expect(resp.newGame.title).toBe('Pacman');
                    expect(resp.newGame.genre).toBe('Arcade');
                    expect(resp.newGame.releaseYear).toBe(1980);
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

                    expect(resp.errorMessage).toBeDefined();

                    resp = await request(router).post('/api/games/').send({
                        genre: 'Arcade',
                        releaseYear: 1980
                    });

                    expect(resp.errorMessage).toBeDefined();
                })
            });

            describe('Game Already Exists', () => {
                it('should return 405', () => {
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
            it('should be defined', () => {
                
            });

            it('should return an Array', () => {
                
            });

            it('should return JSON', () => {
                
            });
            
            it('should return 200 ok', () => {
                
            });
        });
    });
});