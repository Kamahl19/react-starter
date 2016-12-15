import { createSelector } from 'reselect';
import { combineReducers } from 'redux';
import { createReducer } from '@src/redux/reduxHelpers';
import { setToken, removeToken } from '@src/utils/authHelpers';
import actionTypes from '@src/redux/actionTypes';
import { getUnfinishedRequests } from '@src/reducers/loader';

const {
    REQUEST, SUCCESS, FAILURE,
    LOGIN_USER, LOGOUT_USER, FETCH_LOGGED_IN_USER, SIGN_UP,
} = actionTypes;

const initialState = {
    token: null,
    user: null,
};

/**
 * REDUCERS
 */
const token = createReducer(initialState.token, {
    [LOGIN_USER]: {
        [SUCCESS]: (state, payload) => {
            const { token } = payload;

            setToken(token);

            return token;
        },
    },
    [SIGN_UP]: {
        [SUCCESS]: (state, payload) => {
            const { token } = payload;

            setToken(token);

            return token;
        },
    },
    [LOGOUT_USER]: (state) => {
        removeToken();

        return null;
    },
});

const user = createReducer(initialState.user, {
    [LOGIN_USER]: {
        [SUCCESS]: (state, payload) => payload.user,
    },
    [SIGN_UP]: {
        [SUCCESS]: (state, payload) => payload.user,
    },
    [FETCH_LOGGED_IN_USER]: {
        [SUCCESS]: (state, payload) => payload.user,
        [FAILURE]: (state) => null,
    },
    [LOGOUT_USER]: (state) => null,
});

export default combineReducers({
    token,
    user,
});

/**
 * SELECTORS
 */
export const getAuth = (state) => state.auth;

export const getUser = (state) => getAuth(state).user;

export const getToken = (state) => getAuth(state).token;

export const getIsLoggedIn = createSelector(
    getUser,
    (user) => user !== null,
);

export const getIsAuthenticating = createSelector(
    getUnfinishedRequests,
    (unfinishedRequests) => unfinishedRequests.includes(`${LOGIN_USER}_${REQUEST}`) || unfinishedRequests.includes(`${SIGN_UP}_${REQUEST}`),
);

export const getUserName = createSelector(
    getUser,
    (user) => (user && user.name) || '',
);

export const getUserId = createSelector(
    getUser,
    (user) => user && user.id,
);

export const getUserIsAdmin = createSelector(
    getUser,
    (user) => !!(user && user.isAdmin),
);
