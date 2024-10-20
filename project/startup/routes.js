const express = require('express')
const genres = require('../route/genres')
const users = require('../route/users')
const auth = require('../route/auth')
const error = require('../middleware/error')

module.exports = function (app){
    app.use(express.json()) 
    app.use('/api/genres', genres)
    app.use('/api/users', users)
    app.use('/api/auth', auth)
    app.use(error)
}