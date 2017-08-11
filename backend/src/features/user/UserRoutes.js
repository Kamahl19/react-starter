const router = require('express').Router();
const validator = require('../../common/services/validator');
const UserController = require('./UserController');
const UserSchema = require('./UserSchema');
const isLoggedIn = require('../auth/middleware/isLoggedIn');
const isOwnUserId = require('../auth/middleware/isOwnUserId');

router.route('/users').post(validator(UserSchema.create), UserController.create);

router
  .route('/users/:userId')
  .get(isLoggedIn, isOwnUserId, validator(UserSchema.getById), UserController.getById);

router
  .route('/users/:userId/activate/:activationToken')
  .get(validator(UserSchema.activate), UserController.activate);

module.exports = router;
