const { wrap } = require('async-middleware');
const User = require('../../features/user/UserModel');
const {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
} = require('../../common/utils/apiErrors');
const mailer = require('../../common/services/mailer');
const { forgottenPasswordMail, resetPasswordMail } = require('../../app/emails');
const { comparePassword } = require('./authHelpers');

const UserController = {
  /**
   * Login
   */
  login: wrap(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }, '+password');

    if (!user) {
      throw new NotFoundError({ message: 'Requested user does not exist.' });
    }

    if (!comparePassword(password, user.password)) {
      throw new UnauthorizedError({ message: 'Login credentials are wrong.' });
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
      throw new NotFoundError({ message: 'Requested user does not exist.' });
    }

    const link = `${req.headers.origin}/auth/reset-password/${newData.passwordResetToken}`;

    await mailer.sendMail(user.email, forgottenPasswordMail(link));

    return res.json({
      message: `An e-mail has been sent to ${user.email} with further instructions.`,
    });
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
      throw new ForbiddenError({ message: 'Password reset token is invalid or has expired.' });
    }

    await mailer.sendMail(user.email, resetPasswordMail(user.email));

    return res.json({
      message: `Success! Your password has been changed.`,
      token: user.getAuthToken(),
      user: user.getPublicData(),
    });
  }),
};

module.exports = UserController;
