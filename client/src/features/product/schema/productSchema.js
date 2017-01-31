import Joi from 'joi-browser';

const name = Joi.string().required();
const description = Joi.string();

export const productSchema = Joi.object().keys({
  name,
  description,
});
