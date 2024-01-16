const winston = require("winston");
// require("winston-mongodb");
require("dotenv").config();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const logger = require('./startup/logger')
require("./startup/routes")(app);
require('./startup/db')()
require('./startup/config')()






// process.on('uncaughtException', (ex) => {
//   logger.error(ex.message, ex)
//   process.exit(1)
// })

// const logger = 

// winston.exceptions.handle(new winston.transports.File({filename: 'uncaughtExeptions.log'}))
// logger.exceptions.handle(
//   new winston.transports.File({ filename: "uncaughtExeptions.log" })
// );

// throw new Error('Something failed on startup.')

// process.on('unhandledRejection', (ex) => {
//   logger.error(ex.message, ex)
//   process.exit(1)
// })

// logger.rejections.handle(
//   new winston.transports.File({ filename: "uncaughtRejections.log" })
// );

// throw new Error("Something failed miserably.");

// const p = Promise.reject(new Error('Something failed miserably.'))
// p.then(() => console.log('Done'))

logger.info("Server started successfully.");

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = logger;
