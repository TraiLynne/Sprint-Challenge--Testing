const request = require('supertest');

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
            describe('General expectations', () => {
                it('should be defined', () => {
                    
                });
                
                it('should return JSON', () => {
                    
                });
            });

            describe('Success', () => {
                it('should return 201', () => {
                    
                });
    
                it('should return the games data', () => {
                    
                });
                
            });

            describe('Incomplete', () => {
                it('should return 422', () => {
                    
                });
            });

            describe('Game Already Exists', () => {
                it('should return 405', () => {
                    
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