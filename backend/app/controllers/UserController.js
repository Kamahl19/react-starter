const User = require('../models/User');
const helpers = require('../helpers');
const { sendForgottenPasswordMail, sendResetPasswordMail } = require('../preddefinedMails');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const UserController = {

    /**
     * Get User by ID
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
                user: user.getPublicData()
            });
        });
    },

    /**
     * Create User
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

        user.save((err) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            return helpers.getSuccessResult(res, {
                token: user.getAuthToken(),
                user: user.getPublicData()
            });
        });
    },

    /**
     * Update User
     */
    update: (req, res, next) => {
        const { userId } = req.params;
        const { name, password } = req.body;

        if (!name) {
            return next(new BadRequestError({ message: 'User\'s data are missing.' }));
        }

        const newData = { name };

        if (password) {
            newData.password = User.generateHash(password);
        }

        User.findByIdAndUpdate(userId, newData, { new: true }, (err, user) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!user) {
                return next(new BadRequestError({ message: 'Requested user doesn\'t exist.' }));
            }

            return helpers.getSuccessResult(res, {
                user: user.getPublicData()
            });
        });
    },

    /**
     * Login User
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
                user: user.getPublicData()
            });
        });
    },

    /**
     * Forgotten Password
     */
    forgottenPassword: (req, res, next) => {
        const { email } = req.body;

        if (!email) {
            return next(new UnauthorizedError({ message: 'E-mail is missing.' }));
        }

        const newData = User.generatePasswordResetToken();

        User.findOneAndUpdate({ email }, newData, { new: true }, (err, user) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!user) {
                return next(new BadRequestError({ message: 'Requested user doesn\'t exist.' }));
            }

            const link = `${req.headers.origin}${process.env.CORS_ORIGIN ? '/#' : ''}/reset-password/${newData.passwordResetToken}`;

            sendForgottenPasswordMail({ to: user.email }, link)
                .then(() => {
                    helpers.getSuccessResult(res, {
                        message: `An e-mail has been sent to ${user.email} with further instructions.`,
                    });
                })
                .catch((reason) => {
                    next(new InternalServerError(reason));
                });
        });
    },

    /**
     * Reset Password
     */
    resetPassword: (req, res, next) => {
        const { passwordResetToken, password } = req.body;

        if (!passwordResetToken || !password) {
            return next(new UnauthorizedError({ message: 'Password or Token are missing.' }));
        }

        const newData = {
            password: User.generateHash(password),
            passwordResetToken: undefined,
            passwordResetExpires: undefined,
        };

        User
        .findOneAndUpdate({ passwordResetToken }, newData, { new: true })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err, user) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!user) {
                return next(new BadRequestError({ message: 'Password reset token is invalid or has expired.' }));
            }

            sendResetPasswordMail({ to: user.email })
                .then(() => {
                    helpers.getSuccessResult(res, {
                        message: `Success! Your password has been changed.`,
                        token: user.getAuthToken(),
                        user: user.getPublicData()
                    });
                })
                .catch((reason) => {
                    next(new InternalServerError(reason));
                });
        });
    },

};

module.exports = UserController;
