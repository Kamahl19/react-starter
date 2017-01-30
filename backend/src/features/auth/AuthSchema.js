const Joi = require('joi');

const email = Joi.string().max(255).email().required().label('E-mail');
const password = Joi.string().min(6);
const passwordWithoutLimit = Joi.string().required();
const passwordResetToken = Joi.string().hex().length(16);

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
            password,
            passwordResetToken
        }),
    },
};
