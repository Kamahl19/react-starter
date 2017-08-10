const httpStatus = require('http-status');
const { wrap } = require('async-middleware');
const logger = require('../../common/services/logger');
const { NotFoundError, BadRequestError } = require('../../common/utils/apiErrors');
const { formatErrorMessage } = require('../../common/utils/helpers');

// Params/Body/Headers/Query Validation
const formValidationErrorHandler = wrap((err, req, res, next) => {
  if (err.isJoi) {
    throw new BadRequestError({ message: formatErrorMessage(err.details) });
  }

  throw err;
});

// Catch 404 and forward to error handler
const catch404handler = wrap((req, res, next) => {
  throw new NotFoundError({ message: 'Not Found' });
});

// Log and return error
function errorHandler(err, req, res, next) {
  logger.error(err);

  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);

  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
}

module.exports = {
  formValidationErrorHandler,
  catch404handler,
  errorHandler,
};
