const { UnauthorizedError } = require('src/common/utils/apiErrors');

/**
 * Verify if user is accesing his own user account
 */
module.exports = (req, res, next) => {
    if (!req.user || !req.params || req.user.userId !== req.params.userId) {
        return next(new UnauthorizedError({ message: 'You are not allowed to access this page.' }));
    }

    next();
};
