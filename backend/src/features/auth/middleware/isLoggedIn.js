const { wrap } = require('async-middleware');
const { UnauthorizedError } = require('../../../common/utils/apiErrors');
const { isAuthHeaderValid, getPayloadFromAuthHeader } = require('../authHelpers');

/**
 * Verify user token
 */
module.exports = wrap((req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    throw new UnauthorizedError({ message: 'No authorization token was found.' });
  }

  if (!isAuthHeaderValid(req.headers.authorization)) {
    throw new UnauthorizedError({ message: 'Format of the Authorization header is invalid.' });
  }

  req.jwtPayload = getPayloadFromAuthHeader(req.headers.authorization);

  next();
});
