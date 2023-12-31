const { Genre, validate } = require('./models/genre')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name')
    res.send(genres)
})

router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }
    let genre = new Genre({
        // id: genres.length + 1,
        name: req.body.name
    })
    genre = await genre.save()
    // try {
    //     const genre = await genre.save()
    //     console.log(genre)
    // } catch(exception) {
    //     console.log(exception.message)
    // }
    res.send(genre)
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('The genre with the given ID was not found.')
    res.send(genre)
})

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body)
    if(error) {
        return res.status(400).send(error.details[0].message)
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true //This is so that we get the updated object from the database
    })
    if(!genre) return res.status(404).send('The genre with the given ID was not found.')

    res.send(genre)
})

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if(!genre) return res.status(404).send('The genre with the given ID was not found.')

    res.send(genre)
})

module.exports = router