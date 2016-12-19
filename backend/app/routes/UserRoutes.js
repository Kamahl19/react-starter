const router = require('express').Router();
const UserController = require('../controllers/UserController');
const isLoggedIn = require('../middleware/isLoggedIn');
const isOwnId = require('../middleware/isOwnId');

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

module.exports = router;
