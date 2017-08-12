'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateJWTToken, hashPassword } = require('./authUtils');

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
userSchema.pre('save', async function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hash = await hashPassword(user.password);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
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
userSchema.methods.getAuthToken = function() {
  return generateJWTToken(this.id);
};

userSchema.methods.getPublicData = function() {
  return {
    id: this.id,
    email: this.email,
    isActive: this.isActive,
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
