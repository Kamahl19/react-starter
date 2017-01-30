const { UnauthorizedError } = require('src/common/utils/apiErrors');

/**
 * Verify if user is Admin
 */
module.exports = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return next(new UnauthorizedError({ message: 'Only Admin is allowed to access this page.' }));
    }

    next();
};
