const User = require('src/features/user/UserModel');
const { getSuccessResult } = require('src/common/utils/helpers');
const { NotFoundError, UnauthorizedError, ForbiddenError } = require('src/common/utils/apiErrors');
const { mailer } = require('src/common/services');
const { forgottenPasswordMail, resetPasswordMail } = require('src/app/preddefinedMails');

const UserController = {
  /**
   * Login
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
        user: user.getPublicData(),
      });
    } catch (err) {
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

      const user = await User.findOneAndUpdate({ email }, newData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        throw new NotFoundError({ message: 'Requested user does not exist.' });
      }

      const link = `${req.headers.origin}${process.env.CORS_ORIGIN
        ? '/#'
        : ''}/auth/reset-password/${newData.passwordResetToken}`;

      await mailer.sendMail(user.email, forgottenPasswordMail(link));

      return getSuccessResult(res, {
        message: `An e-mail has been sent to ${user.email} with further instructions.`,
      });
    } catch (err) {
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

      const user = await User.findOneAndUpdate({ passwordResetToken }, newData, {
        new: true,
        runValidators: true,
      })
        .where('passwordResetExpires')
        .gt(Date.now())
        .exec();

      if (!user) {
        throw new ForbiddenError({ message: 'Password reset token is invalid or has expired.' });
      }

      await mailer.sendMail(user.email, resetPasswordMail(user.email));

      return getSuccessResult(res, {
        message: `Success! Your password has been changed.`,
        token: user.getAuthToken(),
        user: user.getPublicData(),
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UserController;
