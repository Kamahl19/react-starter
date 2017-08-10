const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../../app/config');

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordResetToken: String,
    passwordResetExpires: Date,
    isActive: { type: Boolean, default: false },
    activationToken: String,
    activationExpires: Date,
  },
  { timestamps: true }
);

/**
 * Hash password on Save
 */
userSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(config.auth.saltRounds, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

/**
 * Make email lowercase
 */
userSchema.pre('save', function(next) {
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }

  next();
});

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
    isActive: this.isActive,
  };
};

/**
 * Static methods
 */
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
