const { wrap } = require('async-middleware');
const User = require('../../features/user/model');
const mailer = require('../../common/services/mailer');
const { forgottenPasswordMail, resetPasswordMail } = require('../../common/messages/mails');
const {
  UserNotFoundError,
  LoginCredentialsError,
  PasswordResetTokenInvalidError,
} = require('../../common/messages/errors');
const { comparePassword } = require('./utils');

const UserController = {
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

module.exports = UserController;
