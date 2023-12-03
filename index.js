const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const genres = [
    {id: 1, name: 'action'},
    {id: 2, name: 'drama'},
    {id: 3, name: 'adventure'}
]

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

// PORT
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))