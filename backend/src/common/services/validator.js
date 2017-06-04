const Celebrate = require('celebrate');

module.exports = schema => Celebrate(schema, { abortEarly: false });
