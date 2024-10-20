require('express-async-errors')
const logger = require('./startup/log')
const express = require('express')

const app = new express()
//require('./startup/log')() // 这个放在最前面
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()


// const p = Promise.reject(new Error('something failed!'))
// p.then(() => {

// })

// throw new Error('there is a exception when app starts up.')

// logger.log('info', 'app starts')

const port = process.env.PORT || 4000
const server = app.listen(port, () => logger.log('info', `listening on port ${port}`))

module.exports = server

