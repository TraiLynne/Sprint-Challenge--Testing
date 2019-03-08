const request = require('supertest');

const gamesModel = require('./gamesModel');
const db = require('../../../db/dbConfig');

describe('Games', () => {
    describe('Game Model', () => {
        describe('CREATE', () => {
            afterEach(async () => {
                await db('games').truncate();
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
            
        });

        describe('UPDATE', () => {
            
        });

        describe('DESTROY', () => {
            
        });
    });

    describe('Game Router', () => {
        describe('POST /', () => {
            
        });

        describe('GET /', () => {
            
        });
    });
});