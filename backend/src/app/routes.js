const router = require('express').Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', require('../features/user/routes'));
router.use('/', require('../features/auth/routes'));

module.exports = router;
