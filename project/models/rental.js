const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String, 
                required: true,
                minLength: 5,
                maxLength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String, 
                required: true,
                minLength: 5,
                maxLength: 50
            }
        }), 
        required: true,
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String, 
                required: true,
                trim: true,
                minLength: 5,
                maxLength: 255
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0,
                max: 255
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema)

function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }
    const result = Joi.validate(rental, schema)
    return result
}

exports.Rental = Rental
exports.validate = validateRental