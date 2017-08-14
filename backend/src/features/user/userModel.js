'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { generateJWTToken } = require('./authUtils');

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
