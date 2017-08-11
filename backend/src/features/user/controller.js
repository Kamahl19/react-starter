const { wrap } = require('async-middleware');
const User = require('./model');
const mailer = require('../../common/services/mailer');
const { activationMail } = require('../../common/messages/mails');
const { UserNotFoundError, ActivationTokenInvalidError } = require('../../common/messages/errors');

const UserController = {
  /**
   * Get User by ID
   */
  getById: wrap(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      throw UserNotFoundError();
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
      email,
      password,
      activationToken: activationTokenAndExpiration.activationToken,
      activationExpires: activationTokenAndExpiration.activationExpires,
    });

    await user.save();

    await mailer.sendMail(
      user.email,
      activationMail({
        origin: req.headers.origin,
        userId: user.id,
        activationToken: user.activationToken,
      })
    );

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
      throw ActivationTokenInvalidError();
    }

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),
};

module.exports = UserController;
