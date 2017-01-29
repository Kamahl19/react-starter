import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { push } from 'react-router-redux';
import { createActionCreator, createActionCreators, createReducer, REQUEST, SUCCESS, FAILURE } from '@src/common/utils/reduxHelpers';
import authApi from '../api/authApi';
import { decodeToken, isTokenValid, getTokenFromLS, saveTokenToLS, removeTokenFromLS } from '../utils/tokenHelpers';

export const FETCH_USER = 'FETCH_USER';
export const SIGN_UP = 'SIGN_UP';
export const UPDATE_USER = 'UPDATE_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FORGOTTEN_PASSWORD = 'FORGOTTEN_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';

/**
 * ACTIONS
 */
const fetchUserActions = createActionCreators(FETCH_USER);
const signUpActions = createActionCreators(SIGN_UP);
const updateUserActions = createActionCreators(UPDATE_USER);
const loginUserActions = createActionCreators(LOGIN_USER);
const forgottenPasswordActions = createActionCreators(FORGOTTEN_PASSWORD);
const resetPasswordActions = createActionCreators(RESET_PASSWORD);
const logoutUser = createActionCreator(LOGOUT_USER);

export const fetchUser = (userId) =>
    (dispatch) => {
        dispatch(fetchUserActions.request());

        authApi.fetchUser(userId)
            .then((payload) => {
                dispatch(fetchUserActions.success(payload));
            })
            .catch((error) => {
                dispatch(fetchUserActions.failure(error));
            });
    };

export const signUp = (userData) =>
    (dispatch) => {
        dispatch(signUpActions.request());

        authApi.createUser(userData)
            .then((payload) => {
                dispatch(signUpActions.success(payload));
                saveTokenToLS(payload.token);
            })
            .catch((error) => {
                 dispatch(signUpActions.failure(error))
            });
    };

export const updateUser = (userId, userData) =>
    (dispatch) => {
        dispatch(updateUserActions.request());

        authApi.updateUser(userId, userData)
            .then((payload) => {
                dispatch(updateUserActions.success(payload));
                dispatch(push('/me'));
            })
            .catch((error) => {
                dispatch(updateUserActions.failure(error));
            });
    };

export const loginUser = (credentials) =>
    (dispatch) => {
        dispatch(loginUserActions.request());

        authApi.loginUser(credentials)
            .then((payload) => {
                dispatch(loginUserActions.success(payload));
                saveTokenToLS(payload.token);
            })
            .catch((error) => {
                dispatch(loginUserActions.failure(error));
            });
    };

export const loginWithToken = () =>
    (dispatch) => {
        const token = getTokenFromLS();

        if (isTokenValid(token)) {
            const { userId } = decodeToken(token);

            dispatch(fetchUserActions.request());
            dispatch(loginUserActions.request());

            authApi.fetchUser(userId)
                .then((payload) => {
                    dispatch(fetchUserActions.success(payload));
                    dispatch(loginUserActions.success({ user: payload.user, token }));
                })
                .catch((error) => {
                    dispatch(fetchUserActions.failure(error));
                    dispatch(loginUserActions.failure());
                });
        }
    };

export const forgottenPassword = (email) =>
    (dispatch) => {
        dispatch(forgottenPasswordActions.request());

        authApi.forgottenPassword(email)
            .then((payload) => {
                dispatch(forgottenPasswordActions.success(payload));
                dispatch(push('/'));
            })
            .catch((error) => {
                dispatch(forgottenPasswordActions.failure(error));
            });
    };

export const resetPassword = (resetData) =>
    (dispatch) => {
        dispatch(resetPasswordActions.request());

        authApi.resetPassword(resetData)
            .then((payload) => {
                dispatch(resetPasswordActions.success(payload));
                dispatch(loginUserActions.success(payload));
                saveTokenToLS(payload.token);
            })
            .catch((error) => {
                dispatch(resetPasswordActions.failure(error));
            });
    };

export const logout = () =>
    (dispatch) => {
        removeTokenFromLS();
        dispatch(logoutUser());
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
    (user) => (user && user.profile.name),
);

export const getUserId = createSelector(
    getUser,
    (user) => user && user.id,
);

export const getUserIsAdmin = createSelector(
    getUser,
    (user) => !!(user && user.isAdmin),
);
