const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");
const error = require("./middleware/error");
require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log("Connected to MongoDB...");
  } catch (err) {
    console.error("Could not connect to MongoDB...", err);
    process.exit(1); // Exit the application if MongoDB connection fails
  }
}

connectToMongoDB();

process.on('uncaughtException', (ex) => {
  console.log('WE GOT AND UNCAUGHT EXCEPTION')
  logger.error(ex.message, ex)
})

const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logfile.log" }),
    // new winston.transports.MongoDB({ db: process.env.MONGO_DB, level: 'error' }),
  ],
});

throw new Error('Something failed during startup.')

logger.info("Server started successfully.");

app.use(express.json());

app.use("/api/genres", genres);
// Anywhere you see 'api/customers' it should match it up to the customers module loaded above.
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

//Error middleware
app.use(error);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = logger;
