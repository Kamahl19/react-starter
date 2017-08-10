const httpStatus = require('http-status');
const logger = require('../../common/services/logger');
const { NotFoundError, BadRequestError } = require('../../common/utils/apiErrors');
const { formatErrorMessage } = require('../../common/utils/helpers');

// Params/Body/Headers/Query Validation
function formValidationErrorHandler(err, req, res, next) {
  if (err.isJoi) {
    return next(new BadRequestError({ message: formatErrorMessage(err.details) }));
  }

  return next(err);
}

// Catch 404 and forward to error handler
function notFoundhandler(req, res, next) {
  return next(new NotFoundError({ message: 'Not Found' }));
}

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
  notFoundhandler,
  errorHandler,
};
