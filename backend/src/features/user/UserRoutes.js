const router = require('express').Router();
const Celebrate = require('celebrate');
const UserController = require('./UserController');
const UserSchema = require('./UserSchema');
const { isLoggedIn, isOwnId } = require('src/common/middleware');

router.route('/users')
    // Create new user
    .post(Celebrate(UserSchema.create), UserController.create);

router.route('/users/:userId')
    // Get user by ID
    .get(isLoggedIn, isOwnId, Celebrate(UserSchema.getById), UserController.getById)
    // Update user
    .put(isLoggedIn, isOwnId, Celebrate(UserSchema.update), UserController.update);

module.exports = router;
