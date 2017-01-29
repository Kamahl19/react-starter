import callApi from '@src/common/utils/callApi';

export default {
    fetchProducts: () =>
        callApi({
            path: `/products`,
        }),

    fetchProduct: (productId) =>
        callApi({
            path: `/products/${productId}`,
        }),

    createProduct: (productData) =>
        callApi({
            path: '/products',
            options: {
                method: 'post',
                body: productData,
            }
        }),

    updateProduct: (productId, productData) =>
        callApi({
            path: `/products/${productId}`,
            options: {
                method: 'put',
                body: productData,
            }
        }),

    deleteProduct: (productId) =>
        callApi({
            path: `/products/${productId}`,
            options: {
                method: 'delete',
            }
        }),
};
