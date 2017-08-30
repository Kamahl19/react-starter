'use strict';

const Joi = require('joi');

module.exports = {
  objectId: Joi.string()
    .hex()
    .length(24),
  hexToken: Joi.string()
    .hex()
    .length(32),
  email: Joi.string()
    .max(255)
    .email()
    .required()
    .label('E-mail'),
  password: Joi.string().min(6),
  passwordWithoutLimit: Joi.string().required(),
};
