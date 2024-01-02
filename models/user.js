const Joi = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
})

const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).maxLength(50).required(),
        email: Joi.string().required(),
        password: Joi.string().minLength(8).required()
    })
}

exports.User = User
exports.validate = validateUser