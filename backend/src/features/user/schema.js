'use strict';

const Joi = require('joi');
const { email, password, passwordWithoutLimit, objectId, hexToken } = require('../../common/rules');

module.exports = {
  getById: {
    params: Joi.object().keys({
      userId: objectId,
    }),
  },

  create: {
    body: Joi.object().keys({
      email,
      password,
    }),
  },

  activate: {
    params: Joi.object().keys({
      userId: objectId,
      activationToken: hexToken,
    }),
  },

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
