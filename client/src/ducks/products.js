import { combineReducers } from 'redux';
import { push } from 'react-router-redux';
import { createActionCreators, createReducer } from '@src/utils/reduxHelpers';
import { productsApi } from '@src/api';
import { REQUEST, SUCCESS, FAILURE } from '@src/constants/values';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * ACTIONS
 */
const fetchProductsActions = createActionCreators(FETCH_PRODUCTS);
const fetchProductActions = createActionCreators(FETCH_PRODUCT);
const createProductActions = createActionCreators(CREATE_PRODUCT);
const updateProductActions = createActionCreators(UPDATE_PRODUCT);
const deleteProductActions = createActionCreators(DELETE_PRODUCT);

export const fetchProducts = () =>
    (dispatch) => {
        dispatch(fetchProductsActions.request());

        productsApi.fetchProducts()
            .then((payload) => {
                dispatch(fetchProductsActions.success(payload));
            })
            .catch((error) => {
                dispatch(fetchProductsActions.failure(error));
            });
    };

export const fetchProduct = (productId) =>
    (dispatch) => {
        dispatch(fetchProductActions.request());

        productsApi.fetchProduct(productId)
            .then((payload) => {
                dispatch(fetchProductActions.success(payload));
            })
            .catch((error) => {
                dispatch(fetchProductActions.failure(error));
            });
    };

export const createProduct = (productData) =>
    (dispatch) => {
        dispatch(createProductActions.request());

        productsApi.createProduct(productData)
            .then((payload) => {
                dispatch(createProductActions.success(payload));
            })
            .catch((error) => {
                dispatch(createProductActions.failure(error));
            });
    };

export const updateProduct = (productId, productData) =>
    (dispatch) => {
        dispatch(updateProductActions.request());

        productsApi.updateProduct(productId, productData)
            .then((payload) => {
                dispatch(updateProductActions.success(payload));
                dispatch(push(`products/${payload.product.id}`));
            })
            .catch((error) => {
                dispatch(updateProductActions.failure(error));
            });
    };

export const deleteProduct = (productId) =>
    (dispatch) => {
        dispatch(deleteProductActions.request());

        productsApi.deleteProduct(productId)
            .then((payload) => {
                dispatch(deleteProductActions.success(payload));
            })
            .catch((error) => {
                dispatch(deleteProductActions.failure(error));
            });
    };

/**
 * REDUCERS
 */
const initialState = {
    selectedProduct: null,
    products: [],
};

const selectedProduct = createReducer(initialState.selectedProduct, {
    [FETCH_PRODUCT]: {
        [REQUEST]: (state) => null,
        [SUCCESS]: (state, payload) => payload.product,
        [FAILURE]: (state) => null,
    }
});

const removeProduct = (products, productToRemove) =>
    products.filter((p) => p.id !== productToRemove.id);

const products = createReducer(initialState.products, {
    [FETCH_PRODUCTS]: {
        [REQUEST]: (state) => [],
        [SUCCESS]: (state, payload) => payload.products,
        [FAILURE]: (state) => [],
    },
    [DELETE_PRODUCT]: {
        [SUCCESS]: (state, payload) => removeProduct(state, payload.product),
    },
});

export default combineReducers({
    selectedProduct,
    products,
});

/**
 * SELECTORS
 */
export const getProductsState = (state) => state.products;

export const getSelectedProduct = (state) => getProductsState(state).selectedProduct;

export const getProducts = (state) => getProductsState(state).products;
