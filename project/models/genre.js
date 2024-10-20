const Joi = require('joi')
const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 25
    },
})

const Genre = mongoose.model('Genre', genreSchema)

function validateGenres(genre){
    const schema = {
        name: Joi.string().min(5).max(25).required()
    }
    const result = Joi.validate(genre, schema)
    return result
}

exports.Genre = Genre
exports.genreSchema = genreSchema
exports.validate = validateGenres