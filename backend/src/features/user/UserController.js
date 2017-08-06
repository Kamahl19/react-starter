const User = require('./UserModel');
const { NotFoundError, ForbiddenError } = require('../../common/utils/apiErrors');
const mailer = require('../../common/services/mailer');
const { activationMail } = require('../../app/preddefinedMails');

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

      const activationTokenAndExpiration = User.generateActivationToken();

      const user = new User({
        email: email.toLowerCase(),
        password: User.generateHash(password),
        activationToken: activationTokenAndExpiration.activationToken,
        activationExpires: activationTokenAndExpiration.activationExpires,
      });

      await user.save();

      const link = `${req.headers.origin}/auth/activate/${user.id}/${user.activationToken}`;

      await mailer.sendMail(user.email, activationMail(link));

      return res.json({
        token: user.getAuthToken(),
        user: user.getPublicData(),
      });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Activate user
   */
  activate: async (req, res, next) => {
    try {
      const { userId, activationToken } = req.params;

      const newData = {
        isActive: true,
        activationToken: undefined,
        activationExpires: undefined,
      };

      const user = await User.findOneAndUpdate(
        { _id: userId, activationToken, isActive: false },
        newData,
        {
          new: true,
          runValidators: true,
        }
      )
        .where('activationExpires')
        .gt(Date.now())
        .exec();

      if (!user) {
        throw new ForbiddenError({ message: 'Activation token is invalid or has expired.' });
      }

      return res.json({
        message: `Success! Your account has been activated.`,
        token: user.getAuthToken(),
        user: user.getPublicData(),
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
