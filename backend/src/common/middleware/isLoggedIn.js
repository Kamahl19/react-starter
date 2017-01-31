const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('src/common/utils/apiErrors');

/**
 * Verify user token
 */
module.exports = (req, res, next) => {
  if (!req.headers || !req.headers.authorization) {
    return next(new UnauthorizedError({ message: 'No authorization token was found.' }));
  }

  const tokenParts = req.headers.authorization.split(' ');

  if (tokenParts.length !== 2 || !(/^Bearer$/i.test(tokenParts[0])) || !tokenParts[1]) {
    return next(new UnauthorizedError({ message: 'Format of the Authorization header is invalid.' }));
  }

  try {
    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }
  catch (err) {
    return next(new UnauthorizedError(err));
  }
};
