const Joi = require('joi');

const email = Joi.string().max(255).email().required().label('E-mail');
const password = Joi.string().min(6);
const userId = Joi.string().hex().length(24);
const activationToken = Joi.string().hex().length(32);

module.exports = {
  getById: {
    params: Joi.object().keys({
      userId,
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
      userId,
      activationToken,
    }),
  },
};
