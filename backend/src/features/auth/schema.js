const Joi = require('joi');
const { email, password, passwordWithoutLimit, hexToken } = require('../../common/rules');

module.exports = {
  login: {
    body: Joi.object().keys({
      email,
      password: passwordWithoutLimit,
    }),
  },

  forgottenPassword: {
    body: Joi.object().keys({
      email,
    }),
  },

  resetPassword: {
    body: Joi.object().keys({
      email,
      password,
      passwordResetToken: hexToken,
    }),
  },
};
