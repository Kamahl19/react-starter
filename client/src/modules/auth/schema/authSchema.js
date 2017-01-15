import Joi from 'joi-browser';

const name = Joi.string().required();
const email = Joi.string().max(255).email().required().label('E-mail');
const password = Joi.string().min(6);
const passwordOptional = Joi.string().allow('').min(6);
const passwordWithoutLimit = Joi.string().required();
const repeatPassword = Joi.string().valid(Joi.ref('password')).options({ language: { any: { allowOnly: 'Passwords don\'t match' } } });

export const loginSchema = Joi.object().keys({
    email,
    password: passwordWithoutLimit,
});

export const forgottenPasswordSchema = Joi.object().keys({
    email,
});

export const resetPasswordSchema = Joi.object().keys({
    password,
    repeatPassword,
});

export const signUpSchema = Joi.object().keys({
    email,
    name,
    password,
    repeatPassword,
});

export const updateUserSchema = Joi.object().keys({
    name,
    password: passwordOptional,
    repeatPassword,
});
