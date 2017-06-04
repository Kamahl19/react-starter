const router = require('express').Router();
const validator = require('src/common/services/validator');
const UserController = require('./UserController');
const UserSchema = require('./UserSchema');
const isLoggedIn = require('src/common/middleware/isLoggedIn');
const isOwnUserId = require('./middleware/isOwnUserId');

router.route('/users').post(validator(UserSchema.create), UserController.create);

router
  .route('/users/:userId')
  .get(isLoggedIn, isOwnUserId, validator(UserSchema.getById), UserController.getById);

module.exports = router;
