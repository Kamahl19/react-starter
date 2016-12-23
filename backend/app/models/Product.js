const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
}, { timestamps: true });

productSchema.methods.getPublicData = function () {
    return {
        id: this._id,
        email: this.name,
        name: this.description,
    };
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
