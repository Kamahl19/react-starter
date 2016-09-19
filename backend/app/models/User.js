'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String, default: '' },
});

/**
 * Methods
 */
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getAuthToken = function () {
    const payload = {
        userId: this._id,
    };

    const options = {
        expiresIn: config.tokenExpireIn,
    };

    const token = jwt.sign(payload, config.passwordSecret, options);

    return token;
};

/**
 * Static methods
 */
userSchema.statics.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

const User = mongoose.model('User', userSchema);

module.exports = User;
