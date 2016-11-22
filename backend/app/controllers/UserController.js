const User = require('../models/User');
const helpers = require('../helpers');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const UserController = {

    create: (req, res, next) => {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return next(new BadRequestError({ message: 'User\'s data are missing.' }));
        }

        User.findOne({ email }, (err, u) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (u) {
                return next(new BadRequestError({ message: 'This email is already used.' }));
            }

            const user = new User({
                email,
                name,
                password: User.generateHash(password),
            });

            user.save((err2) => {
                if (err2) {
                    return next(new InternalServerError(err2));
                }

                return helpers.getSuccessResult(res, {
                    user: {
                        id: user._id,
                        email: user.email,
                        name: user.name,
                    }
                });
            });
        });
    },

    getById: (req, res, next) => {
        const { userId } = req.params;

        User.findById(userId, (err, user) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!user) {
                return next(new BadRequestError({ message: 'Requested user doesn\'t exist.' }));
            }

            return helpers.getSuccessResult(res, {
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                }
            });
        });
    },

    /**
     * Login user
     */
    login: (req, res, next) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new UnauthorizedError({ message: 'Login credentials are missing.' }));
        }

        User.findOne({ email }, '+password', (err, user) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!user || !user.validPassword(password)) {
                return next(new UnauthorizedError({ message: 'Login credentials are wrong.' }));
            }

            return helpers.getSuccessResult(res, {
                token: user.getAuthToken(),
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                },
            });
        });
    },

};

module.exports = UserController;
