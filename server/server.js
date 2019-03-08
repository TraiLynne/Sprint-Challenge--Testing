const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res
        .status(200)
        .json({message: 'Welcome to the Main API'})
})

module.exports = server;