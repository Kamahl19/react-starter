import { createReducer } from '@src/redux/reduxHelpers';
import actionTypes from '@src/redux/actionTypes';
import { getUnfinishedRequests } from '@src/reducers/loader';
import { createSelector } from 'reselect';

const {
    REQUEST, SUCCESS, FAILURE,
    LOGIN_USER, LOGOUT_USER, FETCH_LOGGED_IN_USER, SIGN_UP,
} = actionTypes;

// REDUCERS

const initialState = {
    token: null,
    user: null,
};

const token = createReducer(initialState.token, {
    [SUCCESS]: (state, payload) => {
        const { token } = payload;

        localStorage.setItem(window.tokenName, token);

        return token;
    },
    [LOGOUT_USER]: (state) => {
        localStorage.removeItem(window.tokenName);

        return null;
    },
    [SIGN_UP]: {
        [SUCCESS]: (state, payload) => {
            const { token } = payload;

            localStorage.setItem(window.tokenName, token);

            return token;
        },
    },
});

const user = createReducer(initialState.user, {
    [SIGN_UP]: {
        [SUCCESS]: (state, payload) => payload.user,
    },
    [FETCH_LOGGED_IN_USER]: {
        [SUCCESS]: (state, payload) => payload.user,
        [FAILURE]: (state) => null,
    },
});


export default combineReducers({
    token,
    user,
});

// SELECTORS

export const getAuth = (state) => state.auth;
export const getUser = (state) => getAuth(state).user;
export const getToken = (state) => getAuth(state).token;

export const isLoggedInSelector = createSelector(
    getUser,
    user => user !== null
);

const isAuthenticatingSelector = createSelector(
    getUnfinishedRequests,
    requests => requests.contains(`${LOGIN_USER}_${REQUEST}`) || requests.contains(`${SIGN_UP}_${REQUEST}`),
);


