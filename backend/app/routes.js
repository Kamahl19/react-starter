const router = require('express').Router();
const userRoutes = require('./modules/user/UserRoutes');
const productRoutes = require('./modules/product/ProductRoutes');

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', userRoutes);
router.use('/', productRoutes);

module.exports = router;
