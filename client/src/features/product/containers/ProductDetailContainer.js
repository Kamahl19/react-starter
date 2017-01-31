import React, { Component, PropTypes } from 'react';
import { ProductContainer } from '../containers';
import { ProductDetail } from '../components';

@ProductContainer
export default class ProductProfileContainer extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
  };

  render() {
    const { product } = this.props;

    return (
      <ProductDetail product={product} />
    );
  }
}
