const Product = require('./ProductModel');
const { getSuccessResult } = require('src/common/utils/helpers');
const { NotFoundError } = require('src/common/utils/apiErrors');

const ProductController = {

    /**
     * Get all Products
     */
    getAll: async (req, res, next) => {
        try {
            const products = await Product.find({});

            return getSuccessResult(res, {
                products: products.map((product) => product.getPublicData())
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Get Product by ID
     */
    getById: async (req, res, next) => {
        try {
            const { productId } = req.params;

            const product = await Product.findById(productId);

            if (!product) {
                throw new NotFoundError({ message: 'Requested product doesn\'t exist.' });
            }

            return getSuccessResult(res, {
                product: product.getPublicData()
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Create Product
     */
    create: async (req, res, next) => {
        try {
            const { name, description } = req.body;

            const product = new Product({
                name,
                description,
            });

            await product.save();

            return getSuccessResult(res, {
                product: product.getPublicData()
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Update Product
     */
    update: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const { name, description } = req.body;

            const newData = {
                name,
                description,
            };

            const product = await Product.findByIdAndUpdate(productId, newData, { new: true, runValidators: true });

            if (!product) {
                throw new NotFoundError({ message: 'Requested product doesn\'t exist.' });
            }

            return getSuccessResult(res, {
                product: product.getPublicData()
            });
        }
        catch (err) {
            next(err);
        }
    },

    /**
     * Delete Product
     */
    delete: async (req, res, next) => {
        try {
            const { productId } = req.params;

            const product = await Product.findByIdAndRemove(productId);

            if (!product) {
                throw new NotFoundError({ message: 'Requested product doesn\'t exist.' });
            }

            return getSuccessResult(res, {
                product: product.getPublicData()
            });
        }
        catch (err) {
            next(err);
        }
    },

};

module.exports = ProductController;
