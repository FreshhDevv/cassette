function error(err, req, res, next) {
  const logger = require('..'); // Move the import inside the function
  logger.error(err.message, err );
  res.status(500).send('Something failed.');
}

module.exports = error;
