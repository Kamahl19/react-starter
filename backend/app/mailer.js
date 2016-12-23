const lodash = require('lodash');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const logger = require('./logger');
const config = require('./config');

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

const sendForgottenPasswordMail = (options, link) => sendMail(lodash.merge({}, options, {
    subject: 'Reset your password',
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n
Please click on the following link, or paste this into your browser to complete the process:\n
${link}\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
}));

const sendResetPasswordMail = (options, email) => sendMail(lodash.merge({}, options, {
    subject: 'Your password has been changed',
    text: `Hello,\n\nThis is a confirmation that the password for your account ${options.to} has just been changed.\n`,
}));

module.exports = {
    sendMail,
    sendForgottenPasswordMail,
    sendResetPasswordMail,
};
