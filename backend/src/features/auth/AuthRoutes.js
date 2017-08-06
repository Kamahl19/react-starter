const router = require('express').Router();
const validator = require('../../common/services/validator');
const AuthController = require('./AuthController');
const AuthSchema = require('./AuthSchema');

router.route('/auth/login').post(validator(AuthSchema.login), AuthController.login);

router
  .route('/auth/forgotten-password')
  .post(validator(AuthSchema.forgottenPassword), AuthController.forgottenPassword);

router
  .route('/auth/reset-password')
  .post(validator(AuthSchema.resetPassword), AuthController.resetPassword);

module.exports = router;
