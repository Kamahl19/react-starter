const User = require('./UserModel');
const { NotFoundError } = require('src/common/utils/apiErrors');

const UserController = {
  /**
   * Get User by ID
   */
  getById: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        throw new NotFoundError({ message: 'Requested user does not exist.' });
      }

      return res.json({
        user: user.getPublicData(),
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Create User
   */
  create: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = new User({
        email,
        password: User.generateHash(password),
      });

      await user.save();

      return res.json({
        token: user.getAuthToken(),
        user: user.getPublicData(),
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
