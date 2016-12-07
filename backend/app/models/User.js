const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    name: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
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
        isAdmin: this.isAdmin,
    };

    const options = {
        expiresIn: config.jwt.tokenExpireIn,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    return token;
};

/**
 * Static methods
 */
userSchema.statics.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

const User = mongoose.model('User', userSchema);

module.exports = User;
