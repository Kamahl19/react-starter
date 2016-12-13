import actionTypes from '@src/redux/actionTypes';
import { decodeToken, isTokenValid } from '@src/utils/authHelpers';

const {
    REQUEST, SUCCESS, FAILURE,
    LOGIN_USER, LOGOUT_USER, FETCH_LOGGED_IN_USER, SIGN_UP,
} = actionTypes;

/**
 * Login
 */
export const loginUser = (credentials) => ({
    typeName: LOGIN_USER,
    api: {
        path: '/login',
        options: {
            method: 'post',
            body: JSON.stringify(credentials),
        }
    },
});

/**
 * Logout
 */
export const logout = () => ({
    type: LOGOUT_USER
});

/**
 * Log In User with Token
 */
const fetchLoggedInUser = (userId) => ({
    typeName: FETCH_LOGGED_IN_USER,
    api: {
        path: `/users/${userId}`,
    }
});

const loginUserRequest = () => ({
    type: `${LOGIN_USER}_${REQUEST}`,
});

const loginUserSuccess = (user, token) => ({
    type: `${LOGIN_USER}_${SUCCESS}`,
    payload: { user, token }
});

const loginUserFailure = () => ({
    type: `${LOGIN_USER}_${FAILURE}`,
});

export const loginWithToken = () =>
    (dispatch) => {
        const token = localStorage.getItem(window.tokenName);

        if (isTokenValid(token)) {
            const { userId } = decodeToken(token);

            dispatch(loginUserRequest());

            dispatch(fetchLoggedInUser(userId))
                .then(({ payload }) => dispatch(loginUserSuccess(payload.user, token)))
                .catch(() => dispatch(loginUserFailure()));
        }
    };

/**
 * Sign Up
 */
export const signUp = (userData) => ({
    typeName: SIGN_UP,
    api: {
        path: '/users',
        options: {
            method: 'post',
            body: JSON.stringify(userData),
        }
    }
});
