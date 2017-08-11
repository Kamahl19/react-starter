const { wrap } = require('async-middleware');
const { NotAllowedAccessError } = require('../../../common/messages/errors');

/**
 * Verify if user is accesing his own user account
 */
module.exports = wrap((req, res, next) => {
  if (!req.jwtPayload || !req.params || req.jwtPayload.sub !== req.params.userId) {
    throw NotAllowedAccessError();
  }

  next();
});
