const Joi = require('joi');

const name = Joi.string().required();
const email = Joi.string().max(255).email().required().label('E-mail');
const password = Joi.string().min(6);
const passwordOptional = Joi.string().allow('').min(6);
const userId = Joi.string().hex().length(24);

module.exports = {
    getById: {
        params: Joi.object().keys({
            userId,
        }),
    },

    create: {
        body: Joi.object().keys({
            email,
            name,
            password,
        }),
    },

    update: {
        params: Joi.object().keys({
            userId,
        }),
        body: Joi.object().keys({
            name,
            password: passwordOptional,
        }),
    },
};
