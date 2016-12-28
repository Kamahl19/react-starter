const router = require('express').Router();
const AuthController = require('./AuthController');

router.route('/auth/login')
    // Login
    .post(AuthController.login);

router.route('/auth/forgotten-password')
    // Forgotten Password
    .post(AuthController.forgottenPassword);

router.route('/auth/reset-password')
    // Reset Password
    .post(AuthController.resetPassword);

module.exports = router;
