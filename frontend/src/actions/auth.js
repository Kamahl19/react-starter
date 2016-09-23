import { push } from 'react-router-redux';
import { fetchApi } from '@utils/helpers';
import constants from '@constants';

const {
    LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_REQUEST,
} = constants;

export const loginUserSuccess = ({ token, user }) => ({
    type: LOGIN_USER_SUCCESS,
    payload: {
        token,
        user,
    }
});

export const loginUserFailure = () => ({
    type: LOGIN_USER_FAILURE
});

export const loginUserRequest = () => ({
    type: LOGIN_USER_REQUEST
});

export const loginUser = (credentials, redirect) =>
    (dispatch) => {
        dispatch(loginUserRequest());

        return fetchApi({
            path: '/login',
            method: 'post',
            body: JSON.stringify(credentials),
            dispatch,
            cb: loginUserSuccess,
            fb: loginUserFailure,
        }).then(() => {
            if (redirect) {
                dispatch(push(redirect));
            }
        });
    };

/**
 * Logout
 */
export const logout = () => ({
    type: LOGOUT_USER
});

export const logoutAndRedirect = () =>
    (dispatch) => {
        dispatch(logout());
        dispatch(push('/'));
    };

/**
 * Fetch User data
 */
export const fetchUserSuccess = ({ user }) => ({
    type: FETCH_USER_SUCCESS,
    payload: {
        user
    }
});

export const fetchUserFailure = () => ({
    type: FETCH_USER_FAILURE
});

export const fetchUserRequest = () => ({
    type: FETCH_USER_REQUEST
});

export const fetchUser = (token, userId) =>
    (dispatch) => {
        dispatch(fetchUserRequest());

        return fetchApi({
            path: `/users/${userId}`,
            method: 'get',
            token,
            dispatch,
            cb: fetchUserSuccess,
            fb: fetchUserFailure,
        });
    };
