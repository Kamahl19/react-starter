import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formValidation from '@src/utils/formValidation';
import { createProduct } from '../ducks/productDucks';
import { ProductCreateForm } from '../components';
import { productSchema } from '../schema/productSchema';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ createProduct }, dispatch),
});

@connect(undefined, mapDispatchToProps)
export default class ProductCreateContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
    };

    state = {
        formErrors: {},
    };

    onSubmit = (productData) => {
        const { actions } = this.props;

        this.setState({ formErrors: {} });

        formValidation(productSchema, productData)
            .then(() => {
                actions.createProduct(productData);
            }, (formErrors) => {
                this.setState({ formErrors });
            });
    }

    render() {
        const { formErrors } = this.state;

        return (
            <ProductCreateForm
                formErrors={formErrors}
                onSubmit={this.onSubmit}
            />
        );
    }
}
