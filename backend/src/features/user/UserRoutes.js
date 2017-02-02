const router = require('express').Router();
const Celebrate = require('celebrate');
const UserController = require('./UserController');
const UserSchema = require('./UserSchema');
const { isLoggedIn } = require('src/common/middleware');
const { isOwnUserId } = require('./middleware');

router.route('/users')
  // Create new user
  .post(Celebrate(UserSchema.create), UserController.create);

router.route('/users/:userId')
  // Get user by ID
  .get(isLoggedIn, isOwnUserId, Celebrate(UserSchema.getById), UserController.getById)
  // Update user
  .put(isLoggedIn, isOwnUserId, Celebrate(UserSchema.update), UserController.update);

module.exports = router;
