const Product = require('../models/Product');
const helpers = require('../helpers');
const InternalServerError = require('../errors/InternalServerError');
const BadRequestError = require('../errors/BadRequestError');

const ProductController = {

    /**
     * Get all Products
     */
    getAll: (req, res, next) => {
        Product.find({}, (err, products) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            return helpers.getSuccessResult(res, {
                products: products.map((product) => ({
                    id: product._id,
                    name: product.name,
                    description: product.description,
                }))
            });
        });
    },

    /**
     * Get Product by ID
     */
    getById: (req, res, next) => {
        const { productId } = req.params;

        Product.findById(productId, (err, product) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!product) {
                return next(new BadRequestError({ message: 'Requested product doesn\'t exist.' }));
            }

            return helpers.getSuccessResult(res, {
                product: {
                    id: product._id,
                    name: product.name,
                    description: product.description,
                }
            });
        });
    },

    /**
     * Create Product
     */
    create: (req, res, next) => {
        const { name, description } = req.body;

        if (!name) {
            return next(new BadRequestError({ message: 'Product\'s data are missing.' }));
        }

        const product = new Product({
            name,
            description,
        });

        product.save((err) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            return helpers.getSuccessResult(res, {
                product: {
                    id: product._id,
                    name: product.name,
                    description: product.description,
                }
            });
        });
    },

    /**
     * Update Product
     */
    update: (req, res, next) => {
        const { productId } = req.params;
        const { name, description } = req.body;

        if (!name) {
            return next(new BadRequestError({ message: 'Product\'s data are missing.' }));
        }

        const newData = {
            name,
            description,
        };

        Product.findByIdAndUpdate(productId, newData, { new: true }, (err, product) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!product) {
                return next(new BadRequestError({ message: 'Requested product doesn\'t exist.' }));
            }

            return helpers.getSuccessResult(res, {
                product: {
                    id: product._id,
                    name: product.name,
                    description: product.description,
                }
            });
        });
    },

    /**
     * Delete Product
     */
    delete: (req, res, next) => {
        const { productId } = req.params;

        Product.findByIdAndRemove(productId, (err, product) => {
            if (err) {
                return next(new InternalServerError(err));
            }

            if (!product) {
                return next(new BadRequestError({ message: 'Requested product doesn\'t exist.' }));
            }

            return helpers.getSuccessResult(res, {
                product: {
                    id: product._id,
                    name: product.name,
                    description: product.description,
                }
            });
        });
    },

};

module.exports = ProductController;
