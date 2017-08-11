'use strict';

const httpStatus = require('http-status');

/**
 * BadRequestError 400
 */
function BadRequestError(error) {
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'BadRequestError';
  this.message = error.message;
  this.status = httpStatus.BAD_REQUEST;
  this.inner = error;
}

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = BadRequestError;

/**
 * UnauthorizedError 401
 */
function UnauthorizedError(error) {
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'UnauthorizedError';
  this.message = error.message;
  this.status = httpStatus.UNAUTHORIZED;
  this.inner = error;
}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;

/**
 * ForbiddenError 403
 */
function ForbiddenError(error) {
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'ForbiddenError';
  this.message = error.message;
  this.status = httpStatus.FORBIDDEN;
  this.inner = error;
}

ForbiddenError.prototype = Object.create(Error.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

/**
 * NotFoundError 404
 */
function NotFoundError(error) {
  Error.call(this, error.message);
  Error.captureStackTrace(this, this.constructor);
  this.name = 'NotFoundError';
  this.message = error.message;
  this.status = httpStatus.NOT_FOUND;
  this.inner = error;
}

NotFoundError.prototype = Object.create(Error.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
};
