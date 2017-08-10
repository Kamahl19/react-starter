const { wrap } = require('async-middleware');
const User = require('./UserModel');
const { NotFoundError, ForbiddenError } = require('../../common/utils/apiErrors');
const mailer = require('../../common/services/mailer');
const { activationMail } = require('../../app/preddefinedMails');

const UserController = {
  /**
   * Get User by ID
   */
  getById: wrap(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      throw new NotFoundError({ message: 'Requested user does not exist.' });
    }

    return res.json({
      user: user.getPublicData(),
    });
  }),

  /**
   * Create User
   */
  create: wrap(async (req, res) => {
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
  }),

  /**
   * Activate user
   */
  activate: wrap(async (req, res) => {
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
  }),
};

module.exports = UserController;
