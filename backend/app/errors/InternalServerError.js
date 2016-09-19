'use strict';

function InternalServerError(error) {
    Error.call(this, error.message);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'InternalServerError';
    this.message = error.message;
    this.status = 500;
    this.inner = error;
}

InternalServerError.prototype = Object.create(Error.prototype);
InternalServerError.prototype.constructor = InternalServerError;

module.exports = InternalServerError;
