const express = require('express')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const {User} = require('../models/user')

const router = express.Router()

//authenticate users
router.post('/', async (req, res) => {
    const {error} = validateUser(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send('Invalid email or password.')

    const validPassword = bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password.')

    const token = user.generateAuthToken()
    res.send(token)
})


function validateUser(user){
    const schema = {
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()  // 用户输入的密码长度最多为255
    }
    const result = Joi.validate(user, schema)
    return result
}

module.exports = router