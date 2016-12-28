const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
}, { timestamps: true });

/**
 * Methods
 */
productSchema.methods.getPublicData = function() {
    return {
        id: this.id,
        name: this.name,
        description: this.description,
    };
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
