const router = require('express').Router();
const UserController = require('./UserController');
const { isLoggedIn, isOwnId } = require('../../middleware');

router.route('/users')
    // Create new user
    .post(UserController.create);

router.route('/users/:userId')
    // Get user by ID
    .get(isLoggedIn, isOwnId, UserController.getById)
    // Update user
    .put(isLoggedIn, isOwnId, UserController.update);

module.exports = router;
