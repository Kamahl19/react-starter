import { push } from 'react-router-redux';
import constants from '@constants';

const { LOGIN_USER, LOGIN_USER_SUCCESS, LOGOUT_USER, FETCH_USER } = constants;

export const loginUserSuccess = ({ token, user }) => ({
    type: LOGIN_USER_SUCCESS,
    payload: {
        token,
        user,
    }
});

export const loginUser = (credentials) => ({
    typePrefix: LOGIN_USER,
    api: {
        path: '/login',
        options: {
            method: 'post',
            body: JSON.stringify(credentials),
        }
    },
    payload: credentials,
    validate: 'loginCredentials',
});

/**
 * Logout
 */
export const logoutAndRedirect = () =>
    (dispatch) => {
        dispatch({
            type: LOGOUT_USER
        });

        dispatch(push('/'));
    };

/**
 * Fetch User data
 */
export const fetchUser = (userId) => ({
    typePrefix: FETCH_USER,
    api: {
        path: `/users/${userId}`,
    }
});
