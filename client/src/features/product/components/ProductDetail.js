import React, { PropTypes } from 'react';

const ProductDetail = ({ product }) => (
    <div>
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
    </div>
);

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetail;
