const { wrap } = require('async-middleware');
const { UnauthorizedError } = require('../../../common/utils/apiErrors');

/**
 * Verify if user is accesing his own user account
 */
module.exports = wrap((req, res, next) => {
  if (!req.user || !req.params || req.user.userId !== req.params.userId) {
    throw new UnauthorizedError({ message: 'You are not allowed to access this page.' });
  }

  next();
});
