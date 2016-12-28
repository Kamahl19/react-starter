const router = require('express').Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', require('./modules/user/UserRoutes'));
router.use('/', require('./modules/product/ProductRoutes'));
router.use('/', require('./modules/auth/AuthRoutes'));

module.exports = router;
