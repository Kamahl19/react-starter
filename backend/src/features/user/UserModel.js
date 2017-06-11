const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('src/app/config');

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: { type: Boolean, default: false },
    activationToken: String,
    activationExpires: Date,
  },
  { timestamps: true }
);

/**
 * Methods
 */
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getAuthToken = function() {
  const payload = {
    userId: this.id,
  };

  const options = {
    expiresIn: config.auth.jwtTokenExpireInSec,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  return token;
};

userSchema.methods.getPublicData = function() {
  return {
    id: this.id,
    email: this.email,
    active: this.active,
  };
};

/**
 * Static methods
 */
userSchema.statics.generateHash = password =>
  password ? bcrypt.hashSync(password, bcrypt.genSaltSync(10)) : null;

userSchema.statics.generatePasswordResetToken = () => ({
  passwordResetToken: crypto.randomBytes(16).toString('hex'),
  passwordResetExpires: Date.now() + config.auth.passwordResetExpireInMs,
});

userSchema.statics.generateActivationToken = () => ({
  activationToken: crypto.randomBytes(16).toString('hex'),
  activationExpires: Date.now() + config.auth.activationExpireInMs,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
