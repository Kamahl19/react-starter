const lodash = require('lodash');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const logger = require('app/utils/logger');
const config = require('app/config');

const transporter = nodemailer.createTransport(mailgunTransport({
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    },
    logger,
}));

const defaultMailOptions = {
    from: {
        name: config.mail.from.name,
        address: config.mail.from.address,
    },
};

const getMailOptions = (customOptions = {}) => lodash.merge({}, defaultMailOptions, customOptions);

const sendMail = (options) => transporter.sendMail(getMailOptions(options));

module.exports = {
    sendMail,
};
