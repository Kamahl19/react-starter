import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { createReducer } from '@src/utils/reduxHelpers';
import { REQUEST, SUCCESS, FAILURE } from '@src/constants/values';
import {
    decodeToken, isTokenValid, getTokenFromLocalStorage, saveTokenToLocalStorage, removeTokenFromLocalStorage,
} from '@src/utils/auth/authHelpers';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FETCH_LOGGED_IN_USER = 'FETCH_LOGGED_IN_USER';
export const SIGN_UP = 'SIGN_UP';

/**
 * ACTIONS
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

export const logout = () => ({
    type: LOGOUT_USER
});

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
        const token = getTokenFromLocalStorage();

        if (isTokenValid(token)) {
            const { userId } = decodeToken(token);

            dispatch(loginUserRequest());

            dispatch(fetchLoggedInUser(userId))
                .then(({ payload }) => dispatch(loginUserSuccess(payload.user, token)))
                .catch(() => dispatch(loginUserFailure()));
        }
    };

/**
 * REDUCERS
 */
const initialState = {
    user: null,
    isAuthenticating: false,
};

const isAuthenticating = createReducer(initialState.isAuthenticating, {
    [LOGIN_USER]: {
        [REQUEST]: (state) => true,
        [SUCCESS]: (state) => false,
        [FAILURE]: (state) => false,
    },
    [SIGN_UP]: {
        [REQUEST]: (state) => true,
        [SUCCESS]: (state) => false,
        [FAILURE]: (state) => false,
    },
});

const user = createReducer(initialState.user, {
    [LOGIN_USER]: {
        [SUCCESS]: (state, payload) => {
            const { token, user } = payload;

            saveTokenToLocalStorage(token);

            return user;
        },
    },
    [SIGN_UP]: {
        [SUCCESS]: (state, payload) => {
            const { token, user } = payload;

            saveTokenToLocalStorage(token);

            return user;
        },
    },
    [FETCH_LOGGED_IN_USER]: {
        [SUCCESS]: (state, payload) => payload.user,
        [FAILURE]: (state) => null,
    },
    [LOGOUT_USER]: (state) => {
        removeTokenFromLocalStorage();

        return null;
    },
});

export default combineReducers({
    user,
    isAuthenticating,
});

/**
 * SELECTORS
 */
export const getAuth = (state) => state.auth;

export const getUser = (state) => getAuth(state).user;

export const getIsAuthenticating = (state) => getAuth(state).isAuthenticating;

export const getIsLoggedIn = createSelector(
    getUser,
    (user) => user !== null,
);

export const getUserName = createSelector(
    getUser,
    (user) => (user && user.name),
);

export const getUserId = createSelector(
    getUser,
    (user) => user && user.id,
);

export const getUserIsAdmin = createSelector(
    getUser,
    (user) => !!(user && user.isAdmin),
);
