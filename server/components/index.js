const express = require('express');

const mainRouter = express.Router();

mainRouter.use('/', (req, res) => {
    res
        .status(200)
        .json({
            message: 'Welcome to the Main API'
        })
});

module.exports = mainRouter;