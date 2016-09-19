'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');
const UnauthorizedError = require('../errors/UnauthorizedError');

/**
 * Verify user token
 */
module.exports = (req, res, next) => {
    let token;

    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');

        if (parts.length === 2) {
            if (/^Bearer$/i.test(parts[0])) {
                token = parts[1];
            }
            else {
                return next(new UnauthorizedError({ message: 'Format is Authorization: Bearer [token]' }));
            }
        }
        else {
            return next(new UnauthorizedError({ message: 'Format is Authorization: Bearer [token]' }));
        }
    }

    if (!token) {
        return next(new UnauthorizedError({ message: 'No authorization token was found' }));
    }

    jwt.verify(token, config.passwordSecret, (err, decoded) => {
        if (err) {
            return next(new UnauthorizedError(err));
        }

        req.user = decoded;
        next();
    });
};
