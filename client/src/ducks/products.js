import { combineReducers } from 'redux';
import { push } from 'react-router-redux';
import { createReducer } from '@src/utils/reduxHelpers';
import { REQUEST, SUCCESS, FAILURE } from '@src/constants/values';

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_PRODUCT = 'FETCH_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

/**
 * ACTIONS
 */
export const fetchProducts = () => ({
    typeName: FETCH_PRODUCTS,
    api: {
        path: `/products`,
    }
});

export const fetchProduct = (productId) => ({
    typeName: FETCH_PRODUCT,
    api: {
        path: `/products/${productId}`,
    }
});

export const createProduct = (productData) => ({
    typeName: CREATE_PRODUCT,
    api: {
        path: '/products',
        options: {
            method: 'post',
            body: JSON.stringify(productData),
        }
    }
});

export const updateProduct = (productId, productData) =>
    (dispatch) => {
        dispatch({
            typeName: UPDATE_PRODUCT,
            api: {
                path: `/products/${productId}`,
                options: {
                    method: 'put',
                    body: JSON.stringify(productData),
                }
            }
        })
        .then(({ payload }) => {
            if (payload.product) {
                dispatch(push(`products/${payload.product.id}`))
            }
        });
    };

export const deleteProduct = (productId) => ({
    typeName: DELETE_PRODUCT,
    api: {
        path: `/products/${productId}`,
        options: {
            method: 'delete',
        }
    }
});

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
