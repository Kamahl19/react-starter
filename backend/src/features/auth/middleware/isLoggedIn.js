const jwt = require('jsonwebtoken');
const { wrap } = require('async-middleware');
const { UnauthorizedError } = require('../../../common/utils/apiErrors');

/**
 * Verify user token
 */
module.exports = wrap((req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    throw new UnauthorizedError({ message: 'No authorization token was found.' });
  }

  const tokenParts = req.headers.authorization.split(' ');

  if (tokenParts.length !== 2 || !/^Bearer$/i.test(tokenParts[0]) || !tokenParts[1]) {
    throw new UnauthorizedError({ message: 'Format of the Authorization header is invalid.' });
  }

  const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
  req.user = decoded;
  next();
});
