const Joi = require('joi');
const { email, password, objectId, hexToken } = require('../../common/rules');

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
};
