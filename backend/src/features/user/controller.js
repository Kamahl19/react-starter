const { wrap } = require('async-middleware');
const User = require('./model');
const mailer = require('../../common/services/mailer');
const {
  activationMail,
  forgottenPasswordMail,
  resetPasswordMail,
} = require('../../common/messages/mails');
const {
  UserNotFoundError,
  ActivationTokenInvalidError,
  LoginCredentialsError,
  PasswordResetTokenInvalidError,
} = require('../../common/messages/errors');
const { comparePassword } = require('./authUtils');

module.exports = {
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

  /**
   * Login
   */
  login: wrap(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }, '+password');

    if (!user) {
      throw UserNotFoundError();
    }

    if (!comparePassword(password, user.password)) {
      throw LoginCredentialsError();
    }

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),

  /**
   * Forgotten Password
   */
  forgottenPassword: wrap(async (req, res) => {
    const { email } = req.body;

    const newData = User.generatePasswordResetToken();

    const user = await User.findOneAndUpdate({ email: email.toLowerCase() }, newData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw UserNotFoundError();
    }

    await mailer.sendMail(
      user.email,
      forgottenPasswordMail({
        origin: req.headers.origin,
        passwordResetToken: newData.passwordResetToken,
      })
    );

    return res.end();
  }),

  /**
   * Reset Password
   */
  resetPassword: wrap(async (req, res) => {
    const { email, passwordResetToken, password } = req.body;

    const newData = {
      password,
      passwordResetToken: undefined,
      passwordResetExpires: undefined,
    };

    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase(), passwordResetToken },
      newData,
      {
        new: true,
        runValidators: true,
      }
    )
      .where('passwordResetExpires')
      .gt(Date.now())
      .exec();

    if (!user) {
      throw PasswordResetTokenInvalidError();
    }

    await mailer.sendMail(user.email, resetPasswordMail({ email: user.email }));

    return res.json({
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),
};
