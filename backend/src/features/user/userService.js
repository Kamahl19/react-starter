'use strict';

const User = require('./userModel');
const mailer = require('../../common/services/mailer');
const { comparePassword, hashPassword } = require('./authUtils');
const { generateHexToken } = require('../../common/utils/helpers');
const config = require('../../common/config');
const {
  forgottenPasswordMail,
  resetPasswordMail,
  activationMail,
} = require('../../common/messages/mails');
const {
  UserNotFoundError,
  LoginCredentialsError,
  ActivationTokenInvalidError,
  PasswordResetTokenInvalidError,
} = require('../../common/messages/errors');

module.exports = {
  getUserById: async userId => {
    const user = await User.findById(userId);

    if (!user) {
      throw UserNotFoundError();
    }

    return user;
  },

  createUser: async (userData, origin) => {
    const password = await hashPassword(userData.password);

    const user = new User({
      email: userData.email.toLowerCase(),
      password,
      activationToken: generateHexToken(),
      activationExpires: Date.now() + config.auth.activationExpireInMs,
    });

    await user.save();

    mailer.sendMail(
      user.email,
      activationMail({
        origin,
        userId: user.id,
        activationToken: user.activationToken,
      })
    );

    return user;
  },

  activateUser: async (userId, activationToken) => {
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

    return user;
  },

  login: async (email, password) => {
    const user = await User.findOne({ email: email.toLowerCase() }, '+password');

    if (!user) {
      throw UserNotFoundError();
    }

    if (!comparePassword(password, user.password)) {
      throw LoginCredentialsError();
    }

    return user;
  },

  forgottenPassword: async (email, origin) => {
    const newData = {
      passwordResetToken: generateHexToken(),
      passwordResetExpires: Date.now() + config.auth.passwordResetExpireInMs,
    };

    const user = await User.findOneAndUpdate({ email: email.toLowerCase() }, newData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw UserNotFoundError();
    }

    mailer.sendMail(
      user.email,
      forgottenPasswordMail({
        origin,
        passwordResetToken: newData.passwordResetToken,
      })
    );
  },

  resetPassword: async (email, passwordResetToken, plainPassword) => {
    const password = await hashPassword(plainPassword);

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

    mailer.sendMail(user.email, resetPasswordMail({ email: user.email }));

    return user;
  },
};
