import actionTypes from '@src/redux/actionTypes';

const {
    UPDATE_USER, DELETE_USER, FETCH_USER, FETCH_USERS,
} = actionTypes;

/**
 * Update User
 */
export const updateUser = (userId, userData) => ({
    typeName: UPDATE_USER,
    api: {
        path: `/users/${userId}`,
        options: {
            method: 'put',
            body: JSON.stringify(userData),
        }
    }
});

/**
 * Delete User
 */
export const deleteUser = (userId) => ({
    typeName: DELETE_USER,
    api: {
        path: `/users/${userId}`,
        options: {
            method: 'delete',
        }
    }
});

/**
 * Fetch User
 */
export const fetchUser = (userId) => ({
    typeName: FETCH_USER,
    api: {
        path: `/users/${userId}`,
    }
});

/**
 * Fetch Users
 */
export const fetchUsers = () => ({
    typeName: FETCH_USERS,
    api: {
        path: `/users`,
    }
});
