const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { isLoggedIn, isOwnId } = require('../middleware');

router.route('/users')
    // Create new user
    .post(UserController.create);

router.route('/users/:userId')
    // Get user by ID
    .get(isLoggedIn, isOwnId, UserController.getById)
    // Update user
    .put(isLoggedIn, isOwnId, UserController.update);

router.route('/login')
    // Login
    .post(UserController.login);

router.route('/forgotten-password')
    // Forgotten Password
    .post(UserController.forgottenPassword);

router.route('/reset-password')
    // Reset Password
    .post(UserController.resetPassword);

module.exports = router;
