const router = require('express').Router();
const userRoutes = require('./UserRoutes');
const productRoutes = require('./ProductRoutes');

router.get('/health-check', (req, res) => res.send('OK'));

router.use('/', userRoutes);
router.use('/', productRoutes);

module.exports = router;
