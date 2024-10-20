const express = require('express')
const asyncMiddleware = require('../middleware/asyncMiddleware')
const { Genre } = require('../models/genre')
const { Movie } = require('../models/movie')
const router = express.Router()

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title')
    res.send(movies)
})

router.get('/:id', async(req, res) => {
    const movie = await Movie.findById(req.params.id)
    if(!movie) return res.status(404).send('The Movie with the given id does not exist')
    res.send(movie)
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('Invalid genre!')

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate

    })
    await movie.save()
    res.send(movie)
})