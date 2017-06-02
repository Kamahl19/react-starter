const router = require('express').Router();
const Celebrate = require('celebrate');
const AuthController = require('./AuthController');
const AuthSchema = require('./AuthSchema');

router.route('/auth/login').post(Celebrate(AuthSchema.login), AuthController.login);

router
  .route('/auth/forgotten-password')
  .post(Celebrate(AuthSchema.forgottenPassword), AuthController.forgottenPassword);

router
  .route('/auth/reset-password')
  .post(Celebrate(AuthSchema.resetPassword), AuthController.resetPassword);

module.exports = router;
