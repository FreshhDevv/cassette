const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Joi = require('joi')

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    })
    return schema.validate(customer)
}

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50
    },
    phone: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 10
    },
    isGold: {
        type: Boolean,
        default: false
    }
})

const Customer = mongoose.model('Customer', customerSchema)

// Routes

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    })
    customer = await customer.save()
    res.send(customer)
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send('The customer with the given ID was not found.')
    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body)
    if(error) { 
        return res.status(400).send(error.details[0].message)
    }
    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold}, {
        new: true
    })
    if(!customer) return res.status(404).send('The customer with the given ID was not found.')

    res.send(customer)
})

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if(!customer) return res.status(404).send('The customer with the given ID was not found.')

    res.send(customer)
})

module.exports = router