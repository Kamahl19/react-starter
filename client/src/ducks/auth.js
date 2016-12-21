import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { createReducer } from 'redux-create';
import { REQUEST, SUCCESS, FAILURE } from '@src/constants/values';
import {
    decodeToken, isTokenValid, getTokenFromLocalStorage, saveTokenToLocalStorage, removeTokenFromLocalStorage,
} from '@src/utils/auth/authHelpers';

export const SIGN_UP = 'SIGN_UP';
export const FETCH_USER = 'FETCH_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

/**
 * ACTIONS
 */
export const signUp = (userData) =>
    (dispatch) => {
        dispatch({
            typeName: SIGN_UP,
            api: {
                path: '/users',
                options: {
                    method: 'post',
                    body: JSON.stringify(userData),
                }
            }
        })
        .then(({ payload }) => {
            if (payload.token) {
                saveTokenToLocalStorage(payload.token);
            }
        });
    };

export const fetchUser = (userId) => ({
    typeName: FETCH_USER,
    api: {
        path: `/users/${userId}`,
    }
});

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

export const loginUser = (credentials) =>
    (dispatch) => {
        dispatch({
            typeName: LOGIN_USER,
            api: {
                path: '/login',
                options: {
                    method: 'post',
                    body: JSON.stringify(credentials),
                }
            },
        })
        .then(({ payload }) => {
            if (payload.token) {
                saveTokenToLocalStorage(payload.token);
            }
        });
    };

export const logout = () =>
    (dispatch) => {
        removeTokenFromLocalStorage();

        dispatch({
            type: LOGOUT_USER
        });
    };

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

            dispatch(fetchUser(userId))
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
    [SIGN_UP]: {
        [SUCCESS]: (state, payload) => payload.user,
    },
    [FETCH_USER]: {
        [SUCCESS]: (state, payload) => payload.user,
        [FAILURE]: (state) => null,
    },
    [UPDATE_USER]: {
        [SUCCESS]: (state, payload) => payload.user,
    },
    [LOGIN_USER]: {
        [SUCCESS]: (state, payload) => payload.user,
    },
    [LOGOUT_USER]: (state) => null,
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
