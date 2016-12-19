import React, { PropTypes } from 'react';
import { ScreenContent } from '@src/components/layout';

const ProductDetail = ({ product }) => (
    <ScreenContent>

        <h1>{product.name}</h1>
        <p>Description: {product.description}</p>

    </ScreenContent>
);

ProductDetail.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductDetail;
