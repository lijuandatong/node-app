const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 25
    },
    email: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        minLength: 5,
        maxLength: 1024 // hash后的字符串长度
    },
    isAdmin: Boolean
})
userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
}
const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()  // 用户输入的密码长度最多为255
    }
    const result = Joi.validate(user, schema)
    return result
}

exports.User = User
exports.validate = validateUser