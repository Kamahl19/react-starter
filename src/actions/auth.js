import { push } from 'react-router-redux';
import Alert from 'react-s-alert';
import { checkHttpStatus, parseJSON, fetchApi } from '@utils/helpers';
import constants from '@constants';

const {
    LOGIN_USER_REQUEST, LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_REQUEST,
} = constants;

export const loginUserSuccess = (token, user) => ({
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

// TODO - reuse fetch api
export const loginUser = (credentials, redirect) =>
    (dispatch) => {
        dispatch(loginUserRequest());

        return fetch(`${window.backendUrl}/login`, {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then((response) => {
            const { token, user } = response.data;

            dispatch(loginUserSuccess(token, user));

            if (redirect) {
                dispatch(push(redirect));
            }
        })
        .catch((error) => {
            const { response } = error;

            if (response) {
                response.json()
                .then((err) => {
                    if (err.message) {
                        Alert.error(err.message);
                    }

                    dispatch(loginUserFailure());
                });
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
export const fetchUserSuccess = (data) => ({
    type: FETCH_USER_SUCCESS,
    payload: {
        user: data.user
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
