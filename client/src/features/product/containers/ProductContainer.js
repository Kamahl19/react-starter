import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { getSelectedProduct, fetchProduct } from '../ducks/productDucks';

const makeGetProductIdFromUrl = () =>
    createSelector(
        (_, props) => props.params && props.params.productId,
        (productId) => productId || '',
    );

const mapStateToProps = () => {
    const getProductIdFromUrl = makeGetProductIdFromUrl();

    return (state, props) => ({
        product: getSelectedProduct(state),
        productId: getProductIdFromUrl(state, props),
    });
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ fetchProduct }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
export default (WrappedComponent) => class ProductContainer extends Component {
    static propTypes = {
        actions: PropTypes.object.isRequired,
        product: PropTypes.object,
        productId: PropTypes.string.isRequired,
    };

    componentWillMount() {
        const { actions, productId } = this.props;

        actions.fetchProduct(productId);
    }

    render() {
        const { product } = this.props;

        if (!product) {
            return (<div />);
        }

        return (
            <WrappedComponent
                {...this.props}
            />
        );
    }
};
