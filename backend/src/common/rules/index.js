const Joi = require('joi');

const objectId = Joi.string().hex().length(24);
const hexToken = Joi.string().hex().length(32);
const email = Joi.string().max(255).email().required().label('E-mail');
const password = Joi.string().min(6);
const passwordWithoutLimit = Joi.string().required();

module.exports = {
  objectId,
  hexToken,
  email,
  password,
  passwordWithoutLimit,
};
