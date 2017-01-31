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
    async (dispatch) => {
        try {
            dispatch(fetchUserActions.request());

            const payload = await authApi.fetchUser(userId);

            dispatch(fetchUserActions.success(payload));
        }
        catch (err) {
            dispatch(fetchUserActions.failure(err));
        }
    };

export const signUp = (userData) =>
    async (dispatch) => {
        try {
            dispatch(signUpActions.request());

            const payload = await authApi.createUser(userData);

            dispatch(signUpActions.success(payload));
            saveTokenToLS(payload.token);
        }
        catch (err) {
            dispatch(signUpActions.failure(err));
        }
    };

export const updateUser = (userId, userData) =>
    async (dispatch) => {
        try {
            dispatch(updateUserActions.request());

            const payload = await authApi.updateUser(userId, userData);

            dispatch(updateUserActions.success(payload));
            dispatch(push('/me'));
        }
        catch (err) {
            dispatch(updateUserActions.failure(err));
        }
    };

export const loginUser = (credentials) =>
    async (dispatch) => {
        try {
            dispatch(loginUserActions.request());

            const payload = await authApi.loginUser(credentials);

            dispatch(loginUserActions.success(payload));
            saveTokenToLS(payload.token);
        }
        catch (err) {
            dispatch(loginUserActions.failure(err));
        }
    };

export const loginWithToken = () =>
    async (dispatch) => {
        const token = getTokenFromLS();

        if (isTokenValid(token)) {
            try {
                dispatch(fetchUserActions.request());
                dispatch(loginUserActions.request());

                const { userId } = decodeToken(token);

                const payload = await authApi.fetchUser(userId);

                dispatch(fetchUserActions.success(payload));
                dispatch(loginUserActions.success({ user: payload.user, token }));
            }
            catch (err) {
                dispatch(fetchUserActions.failure(err));
                dispatch(loginUserActions.failure());
            }
        }
    };

export const forgottenPassword = (email) =>
    async (dispatch) => {
        try {
            dispatch(forgottenPasswordActions.request());

            const payload = await authApi.forgottenPassword(email);

            dispatch(forgottenPasswordActions.success(payload));
            dispatch(push('/'));
        }
        catch (err) {
            dispatch(forgottenPasswordActions.failure(err));
        }
    };

export const resetPassword = (resetData) =>
    async (dispatch) => {
        try {
            dispatch(resetPasswordActions.request());

            const payload = await authApi.resetPassword(resetData);

            dispatch(resetPasswordActions.success(payload));
            dispatch(loginUserActions.success(payload));
            saveTokenToLS(payload.token);
        }
        catch (err) {
            dispatch(resetPasswordActions.failure(err));
        }
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
