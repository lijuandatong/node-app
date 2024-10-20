const express = require('express')
const Fawn = require('fawn')
const { Movie } = require('../models/movie')
const { Rental, validate } = require('../models/rental')
const router = express.Router()

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = await User.findById(req.body.userId)
    if(!user) return res.status(400).send('Invalid user!')

    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send('Invalid movie!')

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock')

    let rental = new Rental({
        customer: {
            _id: user._id,
            name: user.name,
            isGold: user.isGold,
            phone: user.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        }
    })

    // two phase commit
    try{
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id},{
            $inc: { numberInStock: -1 }
        })
        .run()

        res.send(rental)
    } catch(ex){
        res.status(500).send('something failed.')
    }
})