import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formValidation from '@src/utils/formValidation';
import { updateProduct } from '../ducks/productsDucks';
import { ProductContainer } from '../containers';
import { ProductUpdateForm } from '../components';
import { updateProductSchema } from '../schema/productsSchema';

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

    onSubmit = (productData) => {
        const { actions, product } = this.props;

        this.setState({ formErrors: {} });

        formValidation(updateProductSchema, productData)
            .then(() => {
                actions.updateProduct(product.id, productData);
            }, (formErrors) => {
                this.setState({ formErrors });
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
