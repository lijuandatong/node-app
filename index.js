const config = require('config')
const Joi = require('joi')
const log = require('./middleware/logger')
const authenticate = require('./authenticate')
const morgan = require('morgan')
const express = require('express')
const courses = require('./routes/courses')
const home = require('./routes/home')
const debug = require('debug')('app:startup')

const app = express()
app.set('view engine', 'pug')

app.use(express.json()) // 解析body json object
app.use(log)
app.use(authenticate)
app.use('/api/courses', courses)
app.use('/', home)

console.log(`App name: ${config.get('name')}`)
console.log(`Mail server: ${config.get('mail.host')}`)
console.log(`Mail password: ${config.get('mail.password')}`)

if(app.get('env') === 'development'){
    app.use(morgan('tiny'))
    debug('morgan is enabled...')
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))