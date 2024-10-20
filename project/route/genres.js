
const express = require('express')
const {Genre, validate} = require('../models/genre')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validateObjectId = require('../middleware/validateObjectId')
const router = express.Router()

router.get('/', async (req, res) => {
    // throw new Error('could not access to the genres')
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.get('/:id', validateObjectId, async(req, res) => {
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('The genre with the given id does not exist')
    res.send(genre)
})

router.post('/', auth, async (req, res) => {
    // validate genres
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let genre = new Genre({name: req.body.name})
    await genre.save()
    res.send(genre)
})

router.put('/:id', async (req, res) => {
    // validate course name
    console.log(req.body.name)
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
    if(!genre) return res.status(404).send('The genre with the given id does not exist')
    res.send(genre)
})

router.delete('/:id', [auth, admin], async(req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    // look up the course
    if(!genre) return res.status(404).send('The genre with the given id does not exist')
    res.send(genre)
})

module.exports = router