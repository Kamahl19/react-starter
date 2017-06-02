const router = require('express').Router();
const Celebrate = require('celebrate');
const UserController = require('./UserController');
const UserSchema = require('./UserSchema');
const { isLoggedIn } = require('src/common/middleware');
const { isOwnUserId } = require('./middleware');

router.route('/users').post(Celebrate(UserSchema.create), UserController.create);

router
  .route('/users/:userId')
  .get(isLoggedIn, isOwnUserId, Celebrate(UserSchema.getById), UserController.getById)
  .put(isLoggedIn, isOwnUserId, Celebrate(UserSchema.update), UserController.update);

module.exports = router;
