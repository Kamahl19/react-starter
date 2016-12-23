import callApi from '@src/utils/callApi';

export default {
    createUser: (userData) =>
        callApi({
            path: '/users',
            options: {
                method: 'post',
                body: userData,
            }
        }),

    fetchUser: (userId) =>
        callApi({
            path: `/users/${userId}`,
        }),

    updateUser: (userId, userData) =>
        callApi({
            path: `/users/${userId}`,
            options: {
                method: 'put',
                body: userData,
            }
        }),

    loginUser: (credentials) =>
        callApi({
            path: '/login',
            options: {
                method: 'post',
                body: credentials,
            }
        }),
};
