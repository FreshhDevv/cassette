const mongoose = require("mongoose");
const winston = require("winston");

const dbLogger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: "logfile.log"})
  ]
})

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        // logger.info('Connected to MongoDB...')
        dbLogger.info('Connected to MongoDB...')
    } catch (err) {
      dbLogger.error(err.message, err);
      process.exit(1); // Exit the application if MongoDB connection fails
    }
  }
  
  connectToMongoDB();

  module.exports = connectToMongoDB