const express = require('express');

const server = express();

const mainRouter = require('./components');

server.use('/api', mainRouter);

server.use('/', (req, res) => {
    res
        .status(200)
        .json({message: 'It\'s Working !!'})
})

module.exports = server;