import { combineReducers } from 'redux';
import { push } from 'react-router-redux';
import { createActionCreators, createReducer, REQUEST, SUCCESS, FAILURE } from '@src/common/utils/reduxHelpers';
import productApi from '../api/productApi';

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
  async (dispatch) => {
    try {
      dispatch(fetchProductsActions.request());

      const payload = await productApi.fetchProducts();

      dispatch(fetchProductsActions.success(payload));
    }
    catch (err) {
      dispatch(fetchProductsActions.failure(err));
    }
  };

export const fetchProduct = (productId) =>
  async (dispatch) => {
    try {
      dispatch(fetchProductActions.request());

      const payload = await productApi.fetchProduct(productId);

      dispatch(fetchProductActions.success(payload));
    }
    catch (err) {
      dispatch(fetchProductActions.failure(err));
    }
  };

export const createProduct = (productData) =>
  async (dispatch) => {
    try {
      dispatch(createProductActions.request());

      const payload = await productApi.createProduct(productData);

      dispatch(createProductActions.success(payload));
      dispatch(push(`products/${payload.product.id}`));
    }
    catch (err) {
      dispatch(createProductActions.failure(err));
    }
  };

export const updateProduct = (productId, productData) =>
  async (dispatch) => {
    try {
      dispatch(updateProductActions.request());

      const payload = await productApi.updateProduct(productId, productData);

      dispatch(updateProductActions.success(payload));
      dispatch(push(`products/${payload.product.id}`));
    }
    catch (err) {
      dispatch(updateProductActions.failure(err));
    }
  };

export const deleteProduct = (productId) =>
  async (dispatch) => {
    try {
      dispatch(deleteProductActions.request());

      const payload = await productApi.deleteProduct(productId);

      dispatch(deleteProductActions.success(payload));
    }
    catch (err) {
      dispatch(deleteProductActions.failure(err));
    }
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
export const getProductState = (state) => state.product;

export const getSelectedProduct = (state) => getProductState(state).selectedProduct;

export const getProducts = (state) => getProductState(state).products;
