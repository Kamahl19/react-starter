'use strict';

const router = require('express').Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', require('../features/user/userRoutes'));

module.exports = router;
