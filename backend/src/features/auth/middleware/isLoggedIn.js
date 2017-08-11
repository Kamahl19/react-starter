const { wrap } = require('async-middleware');
const {
  AuthTokenNotFoundError,
  AuthTokenInvalidError,
} = require('../../../common/messages/errors');
const { isAuthHeaderValid, getPayloadFromAuthHeader } = require('../utils');

/**
 * Verify user token
 */
module.exports = wrap((req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    throw AuthTokenNotFoundError();
  }

  if (!isAuthHeaderValid(req.headers.authorization)) {
    throw AuthTokenInvalidError();
  }

  req.jwtPayload = getPayloadFromAuthHeader(req.headers.authorization);

  next();
});
