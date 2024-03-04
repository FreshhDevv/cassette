const mongoose = require("mongoose");
const winston = require("winston");
const logger = require("./logger"); // Import the logger module

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    // logger.info('Connected to MongoDB...')
    logger.info("Connected to MongoDB...");
  } catch (err) {
    logger.error(err.message, err);
    process.exit(1); // Exit the application if MongoDB connection fails
  }
}

connectToMongoDB();

module.exports = connectToMongoDB;
