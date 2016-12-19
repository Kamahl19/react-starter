import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserIsAdmin } from '@src/ducks/auth';
import { getProducts, fetchProducts, deleteProduct } from '@src/ducks/products';
import { ProductTable } from '@src/components/screens';

const mapStateToProps = (state) => ({
    products: getProducts(state),
    canDelete: getUserIsAdmin(state),
    canUpdate: getUserIsAdmin(state),
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({
        fetchProducts,
        deleteProduct,
    }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default class ProductTableContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        products: PropTypes.array.isRequired,
        canDelete: PropTypes.bool.isRequired,
        canUpdate: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        this.props.actions.fetchProducts();
    }

    onDeleteClick = (productId) => {
        this.props.actions.deleteProduct(productId);
    }

    render() {
        const { products, canDelete, canUpdate } = this.props;

        return (
            <ProductTable
                products={products}
                canDelete={canDelete}
                canUpdate={canUpdate}
                onDeleteClick={this.onDeleteClick}
            />
        );
    }
}
