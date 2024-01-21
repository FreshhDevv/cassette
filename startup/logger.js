const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");

const logger = winston.createLogger({
  level: ["error", "info"], // or whichever level you prefer
  format: winston.format.json(),
  transports: [
      new winston.transports.File({ filename: "logfile.log" }),
      new winston.transports.MongoDB({ db: process.env.MONGO_DB, level: ['error', 'info'] }),
      new winston.transports.File({ filename: "uncaughtExceptions.log" }),
      new winston.transports.File({ filename: "uncaughtRejections.log" }),
      new winston.transports.Console({ 
          format: winston.format.simple(), // Specify the format for console output
      }),
  ],
});


module.exports = logger;
