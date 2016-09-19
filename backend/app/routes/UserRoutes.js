'use strict';

const router = require('express').Router();
const UserController = require('../controllers/UserController');
const isLoggedIn = require('../middleware/isLoggedIn');

router.route('/users')
    .post(UserController.create);

router.route('/users/:userId')
    .get(isLoggedIn, UserController.getById);

router.route('/login')
    .post(UserController.login);

module.exports = router;
