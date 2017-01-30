const Joi = require('joi');

const name = Joi.string().required();
const description = Joi.string();
const productId = Joi.string().hex().length(24);

module.exports = {
    getById: {
        params: Joi.object().keys({
            productId,
        }),
    },

    create: {
        body: Joi.object().keys({
            name,
            description,
        }),
    },

    update: {
        params: Joi.object().keys({
            productId,
        }),
        body: Joi.object().keys({
            name,
            description,
        }),
    },

    delete: {
        params: Joi.object().keys({
            productId,
        }),
    },
};
