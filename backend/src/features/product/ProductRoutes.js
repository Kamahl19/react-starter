const router = require('express').Router();
const Celebrate = require('celebrate');
const ProductController = require('./ProductController');
const ProductSchema = require('./ProductSchema');
const { isLoggedIn, isAdmin } = require('src/common/middleware');

router.route('/products')
  // Get all products
  .get(ProductController.getAll)
  // Create new product
  .post(isLoggedIn, isAdmin, Celebrate(ProductSchema.create), ProductController.create);

router.route('/products/:productId')
  // Get product by ID
  .get(Celebrate(ProductSchema.getById), ProductController.getById)
  // Update product
  .put(isLoggedIn, isAdmin, Celebrate(ProductSchema.update), ProductController.update)
  // Delete product
  .delete(isLoggedIn, isAdmin, Celebrate(ProductSchema.delete), ProductController.delete);

module.exports = router;
