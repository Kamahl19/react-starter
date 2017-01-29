const router = require('express').Router();

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', require('app/modules/user/UserRoutes'));
router.use('/', require('app/modules/product/ProductRoutes'));
router.use('/', require('app/modules/auth/AuthRoutes'));

module.exports = router;
