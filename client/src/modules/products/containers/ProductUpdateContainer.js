import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formValidation } from '@src/utils/form';
import { updateProduct } from '../ducks/productsDucks';
import { ProductContainer } from '../containers';
import { ProductUpdateForm } from '../components';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ updateProduct }, dispatch),
});

@ProductContainer
@connect(undefined, mapDispatchToProps)
export default class ProductUpdateContainer extends Component {
    static propTypes = {
        product: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (updateProductData) => {
        const { actions, product } = this.props;

        this.setState({ formErrors: {} });

        formValidation({ updateProductData })
            .then(() => {
                actions.updateProduct(product.id, updateProductData);
            }, (err) => {
                this.setState({ formErrors: err.updateProductData });
            });
    }

    render() {
        const { product } = this.props;
        const { formErrors } = this.state;

        return (
            <ProductUpdateForm
                product={product}
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
