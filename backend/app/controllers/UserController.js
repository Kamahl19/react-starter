const User = require('../models/User');
const helpers = require('../helpers');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const UserController = {

    /**
     * Create user
     */
    create: (req, res, next) => {
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return next(new BadRequestError({ message: 'User\'s data are missing.' }));
        }

        const user = new User({
            email,
            name,
            password: User.generateHash(password),
        });

        user.save(user, (err, user) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            return helpers.getSuccessResult(res, {
                token: user.getAuthToken(),
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                }
            });
        });
    },

    /**
     * Update user
     */
    update: (req, res, next) => {
        const { userId } = req.params;
        const { name, password } = req.body;

        if (!name) {
            return next(new BadRequestError({ message: 'User\'s data are missing.' }));
        }

        const newDate = { name };

        if (password) {
            newDate.password = User.generateHash(password);
        }

        User.findByIdAndUpdate(userId, newDate, { new: true }, (err, user) => {
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
                    isAdmin: user.isAdmin,
                }
            });
        });
    },

    /**
     * Delete user
     */
    delete: (req, res, next) => {
        const { userId } = req.params;

        User.findByIdAndRemove(userId, (err, user) => {
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
                    isAdmin: user.isAdmin,
                }
            });
        });
    },

    /**
     * Get user by ID
     */
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
                    isAdmin: user.isAdmin,
                }
            });
        });
    },

    /**
     * Get all users
     */
    getAll: (req, res, next) => {
        User.find({}, null, (err, users) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            return helpers.getSuccessResult(res, {
                users: users.map((user) => ({
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    isAdmin: user.isAdmin,
                }))
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
                    isAdmin: user.isAdmin,
                },
            });
        });
    },

};

module.exports = UserController;
