const lodash = require('lodash');
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const logger = require('src/common/services/logger');
const config = require('src/app/config');

const mailgunTransporter = nodemailer.createTransport(
  mailgunTransport({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
    logger,
  })
);

class DummyTransporter {
  sendMail(data) {
    logger.info(data);
  }
}

const transporter = process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN
  ? mailgunTransporter
  : new DummyTransporter();

const defaultMailOptions = {
  from: {
    name: config.mail.from.name,
    address: config.mail.from.address,
  },
};

const sendMail = (to, template, options) =>
  transporter.sendMail(lodash.merge({}, defaultMailOptions, { to }, template, options));

module.exports = {
  sendMail,
};
