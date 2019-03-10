const express = require('express');

const router = express.Router();
const db = require('./gamesModel');

router.use(express.json());

router.post('/', async (req, res) => {
    const gameData = req.body;

    try {
        if (!gameData.title || gameData.title === '' || !gameData.genre || gameData.genre === '') {
            res
                .status(422)
                .json({
                    errorMessage: 'Title & Genre are required'
                });

        } else {
            let existingGames = await db.findBy({ title: gameData.title });

            if(existingGames.length > 0){
                res
                    .status(405)
                    .json({
                        errorMessage: `${gameData.title} already exists`
                    })
            } else {
                let newGame = await db.create(gameData);

                res
                    .status(201)
                    .json(newGame)
            }
        }
    } catch (err) {
        res
            .status(500)
            .json({
                errorMessage: 'Houston we have a problem'
            })
    }
});

router.get('/', (req, res) => {
    res
        .status(200)
        .json({
            operation: 'GET',
            url: '/api/games/'
        });
});

router.use('/', (req, res) => res.send('Welcome to the Games API'));


module.exports = router;