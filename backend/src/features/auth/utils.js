const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../app/config');

function parseAuthHeader(authHeader) {
  const parts = authHeader.split(' ');

  return {
    bearer: parts[0],
    token: parts[1],
  };
}

function isAuthHeaderValid(authHeader) {
  const { bearer, token } = parseAuthHeader(authHeader);

  return !!(/^Bearer$/i.test(bearer) && token);
}

function getPayloadFromAuthHeader(authHeader) {
  const { token } = parseAuthHeader(authHeader);

  return jwt.verify(token, process.env.JWT_SECRET);
}

function generateJWTToken(subject) {
  const options = {
    expiresIn: config.auth.jwtTokenExpireInSec,
    subject,
  };

  return jwt.sign({}, process.env.JWT_SECRET, options);
}

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(config.auth.saltRounds, (err, salt) => {
      if (err) {
        return reject(err);
      }

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          return reject(err);
        }

        resolve(hash);
      });
    });
  });
}

function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  parseAuthHeader,
  isAuthHeaderValid,
  getPayloadFromAuthHeader,
  generateJWTToken,
  hashPassword,
  comparePassword,
};
