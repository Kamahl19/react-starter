const { or } = require('middleware-flow');
const router = require('express').Router();
const UserController = require('../controllers/UserController');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');
const isOwnId = require('../middleware/isOwnId');

router.route('/users')
    // Get all users
    .get(UserController.getAll)
    // Create new user
    .post(UserController.create);

router.route('/users/:userId')
    // Get user by ID
    .get(UserController.getById)
    // Update user
    .put(isLoggedIn, or(isOwnId, isAdmin), UserController.update)
    // Delete user
    .delete(isLoggedIn, isAdmin, UserController.delete);

router.route('/login')
    // Login
    .post(UserController.login);

module.exports = router;
