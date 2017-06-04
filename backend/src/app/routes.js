const router = require('express').Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', require('src/features/user/UserRoutes'));
router.use('/', require('src/features/auth/AuthRoutes'));

module.exports = router;
