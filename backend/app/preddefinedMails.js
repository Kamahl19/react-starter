const lodash = require('lodash');
const { sendMail } = require('./utils/mailer');

const sendForgottenPasswordMail = (options, link) => sendMail(lodash.merge({}, options, {
    subject: 'Reset your password',
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n
Please click on the following link, or paste this into your browser to complete the process:\n
${link}\n
If you did not request this, please ignore this email and your password will remain unchanged.\n`,
}));

const sendResetPasswordMail = (options) => sendMail(lodash.merge({}, options, {
    subject: 'Your password has been changed',
    text: `Hello,\n\nThis is a confirmation that the password for your account ${options.to} has just been changed.\n`,
}));

module.exports = {
    sendForgottenPasswordMail,
    sendResetPasswordMail,
};
