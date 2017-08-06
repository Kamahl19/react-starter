const router = require('express').Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', require('../features/user/UserRoutes'));
router.use('/', require('../features/auth/AuthRoutes'));

module.exports = router;
