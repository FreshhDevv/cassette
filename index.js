const error = require('./middleware/error')
require("dotenv").config();
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')
const config = require('config')

if(!config.get('jwtPrivateKey')){
  console.error('FATAL ERROR: jwtPrivateKey is not defined.')
  process.exit(1)
}

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());

app.use("/api/genres", genres);
// Anywhere you see 'api/customers' it should match it up to the customers module loaded above.
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

//Error middleware
app.use(error)

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
