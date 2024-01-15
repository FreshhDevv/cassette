const mongoose = require("mongoose");
const logger = require("..");


async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        logger.info('Connected to MongoDB...')
    } catch (err) {
      logger.error(err.message, err);
      process.exit(1); // Exit the application if MongoDB connection fails
    }
  }
  
  connectToMongoDB();

  module.exports = connectToMongoDB