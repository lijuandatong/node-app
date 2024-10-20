const _ = require('lodash')
const express = require('express')
const bcrypt = require('bcrypt')
const {User, validate} = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/me', auth, async (req, res) => { // 这里是鉴权
    console.log('req.user', req.user)
    const user = await User.findById(req.user._id).select('-password')
    res.send(user)
})

router.get('/', async (req, res) => {
    const users = await User.find().sort('name')
    res.send(users)
})

router.post('/', async (req, res) => {
    // validate
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('This user has already exist.')

    user = new User(_.pick(req.body, ['name', 'email', 'password'])) //lodash

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    
    await user.save()

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})

router.put('/:id', async (req, res) => {
    // validate
    // const {error} = validate(req.body)
    // if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(
        req.params.id, 
        {name: req.body.name,
         email: req.body.email,
         password: req.body.password}, 
        {new: true})
    if(!user) return res.status(404).send('The user with the given id does not exist')
    res.send(user)
})

router.get('/:id', async(req, res) => {
    const user = await Genre.findById(req.params.id)
    if(!user) return res.status(404).send('The user with the given id does not exist')
    res.send(user)
})

router.delete('/:id', async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id)
    if(!user) return res.status(404).send('The user with the given id does not exist')
    res.send(user)
})

module.exports = router