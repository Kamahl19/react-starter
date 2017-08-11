'use strict';

const router = require('express').Router();
const validator = require('../../common/services/validator');
const controller = require('./controller');
const schema = require('./schema');
const isLoggedIn = require('./middleware/isLoggedIn');
const isOwnUserId = require('./middleware/isOwnUserId');

router.route('/users').post(validator(schema.create), controller.create);

router
  .route('/users/:userId')
  .get(isLoggedIn, isOwnUserId, validator(schema.getById), controller.getById);

router
  .route('/users/:userId/activate/:activationToken')
  .get(validator(schema.activate), controller.activate);

router.route('/auth/login').post(validator(schema.login), controller.login);

router
  .route('/auth/forgotten-password')
  .post(validator(schema.forgottenPassword), controller.forgottenPassword);

router
  .route('/auth/reset-password')
  .post(validator(schema.resetPassword), controller.resetPassword);

module.exports = router;
