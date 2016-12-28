const User = require('./UserModel');
const { getSuccessResult } = require('../../utils/helpers');
const { NotFoundError, UnauthorizedError, ForbiddenError } = require('../../utils/apiErrors');
const { sendForgottenPasswordMail, sendResetPasswordMail } = require('../../preddefinedMails');

const UserController = {

    /**
     * Get User by ID
     */
    getById: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);

            if (!user) {
                throw new NotFoundError({ message: 'Requested user doesn\'t exist.' });
            }

            return getSuccessResult(res, {
                user: user.getPublicData(),
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Create User
     */
    create: async (req, res, next) => {
        try {
            const { email, name, password } = req.body;

            const user = new User({
                email,
                profile: {
                    name,
                },
                password: User.generateHash(password),
            });

            await user.save();

            return getSuccessResult(res, {
                token: user.getAuthToken(),
                user: user.getPublicData(),
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Update User
     */
    update: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const { name, password } = req.body;

            const newData = {
                profile: {
                    name
                }
            };

            if (password) {
                newData.password = User.generateHash(password);
            }

            const user = await User.findByIdAndUpdate(userId, newData, { new: true, runValidators: true });

            if (!user) {
                throw new NotFoundError({ message: 'Requested user doesn\'t exist.' });
            }

            return getSuccessResult(res, {
                user: user.getPublicData()
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Login User
     */
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email }, '+password');

            if (!user.validPassword(password)) {
                throw new UnauthorizedError({ message: 'Login credentials are wrong.' });
            }

            return getSuccessResult(res, {
                token: user.getAuthToken(),
                user: user.getPublicData()
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Forgotten Password
     */
    forgottenPassword: async (req, res, next) => {
        try {
            const { email } = req.body;

            const newData = User.generatePasswordResetToken();

            const user = await User.findOneAndUpdate({ email }, newData, { new: true, runValidators: true });

            if (!user) {
                throw new NotFoundError({ message: 'Requested user doesn\'t exist.' });
            }

            const link = `${req.headers.origin}${process.env.CORS_ORIGIN ? '/#' : ''}/reset-password/${newData.passwordResetToken}`;

            await sendForgottenPasswordMail({ to: user.email }, link);

            return getSuccessResult(res, {
                message: `An e-mail has been sent to ${user.email} with further instructions.`,
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Reset Password
     */
    resetPassword: async (req, res, next) => {
        try {
            const { passwordResetToken, password } = req.body;

            const newData = {
                password: User.generateHash(password),
                passwordResetToken: undefined,
                passwordResetExpires: undefined,
            };

            const user = await User.findOneAndUpdate({ passwordResetToken }, newData, { new: true, runValidators: true })
                                    .where('passwordResetExpires').gt(Date.now())
                                    .exec();

            if (!user) {
                throw new ForbiddenError({ message: 'Password reset token is invalid or has expired.' });
            }

            await sendResetPasswordMail({ to: user.email });

            return getSuccessResult(res, {
                message: `Success! Your password has been changed.`,
                token: user.getAuthToken(),
                user: user.getPublicData()
            });
        }
        catch (err) {
            next(err);
        }
    },

};

module.exports = UserController;
