const router = require('express').Router();
const Celebrate = require('celebrate');
const ProductController = require('./ProductController');
const ProductSchema = require('./ProductSchema');
const { isLoggedIn, isAdmin } = require('src/common/middleware');

router
  .route('/products')
  .get(ProductController.getAll)
  .post(isLoggedIn, isAdmin, Celebrate(ProductSchema.create), ProductController.create);

router
  .route('/products/:productId')
  .get(Celebrate(ProductSchema.getById), ProductController.getById)
  .put(isLoggedIn, isAdmin, Celebrate(ProductSchema.update), ProductController.update)
  .delete(isLoggedIn, isAdmin, Celebrate(ProductSchema.delete), ProductController.delete);

module.exports = router;
