const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    // res.send('hello world')
    res.render('index', {title: 'My Express app', message: 'Hello'})
})

module.exports = router