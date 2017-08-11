const httpStatus = require('http-status');
const { wrap } = require('async-middleware');
const logger = require('../../common/services/logger');
const { PageNotFoundError, RequestNotValidError } = require('../../common/messages/errors');

/**
 * Params/Body/Headers/Query Validation
 */
const requestValidationErrorHandler = wrap((err, req, res, next) => {
  if (err.isJoi) {
    throw RequestNotValidError(err.details);
  }

  throw err;
});

/**
 * Catch 404 and forward to error handler
 */
const catch404handler = wrap((req, res, next) => {
  throw PageNotFoundError();
});

/**
 * Log and return error
 */
function errorHandler(err, req, res, next) {
  logger.error(err);

  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
}

module.exports = {
  requestValidationErrorHandler,
  catch404handler,
  errorHandler,
};
