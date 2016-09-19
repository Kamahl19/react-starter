'use strict';

function BadRequestError(error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'BadRequestError';
    this.message = error.message;
    this.status = 400;
    this.inner = error;
}

BadRequestError.prototype = Object.create(Error.prototype);
BadRequestError.prototype.constructor = BadRequestError;

module.exports = BadRequestError;
