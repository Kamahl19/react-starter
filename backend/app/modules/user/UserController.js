const User = require('./UserModel');
const { getSuccessResult } = require('app/utils/helpers');
const { NotFoundError } = require('app/utils/apiErrors');

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

};

module.exports = UserController;
