import { createReducer } from '@src/redux/reduxHelpers';
import actionTypes from '@src/redux/actionTypes';

const {
    REQUEST, SUCCESS, FAILURE,
    LOGIN_USER, LOGOUT_USER, FETCH_LOGGED_IN_USER, SIGN_UP,
} = actionTypes;

const initialState = {
    token: null,
    user: null,
    isLoggedIn: false,
    isAuthenticating: false,
};

export default createReducer(initialState, {
    [LOGIN_USER]: {
        [REQUEST]: (state) => ({
            ...state,
            ...{
                isAuthenticating: true,
            }
        }),
        [SUCCESS]: (state, payload) => {
            const { token, user } = payload;

            localStorage.setItem(window.tokenName, token);

            return {
                ...state,
                ...{
                    token,
                    user,
                    isLoggedIn: true,
                    isAuthenticating: false,
                }
            };
        },
        [FAILURE]: (state) => {
            localStorage.removeItem(window.tokenName);

            return {
                ...state,
                ...{
                    isAuthenticating: false,
                }
            };
        },
    },

    [SIGN_UP]: {
        [REQUEST]: (state) => ({
            ...state,
            ...{
                isAuthenticating: true,
            }
        }),
        [SUCCESS]: (state, payload) => {
            const { token, user } = payload;

            localStorage.setItem(window.tokenName, token);

            return {
                ...state,
                ...{
                    token,
                    user,
                    isLoggedIn: true,
                    isAuthenticating: false,
                }
            };
        },
        [FAILURE]: (state) => ({
            ...state,
            ...{
                isAuthenticating: false,
            }
        }),
    },

    [FETCH_LOGGED_IN_USER]: {
        [REQUEST]: (state) => state,
        [SUCCESS]: (state, payload) => ({
            ...state,
            ...{
                user: payload.user,
            }
        }),
        [FAILURE]: (state) => ({
            ...state,
            ...{
                user: null,
            }
        }),
    },

    [LOGOUT_USER]: (state) => {
        localStorage.removeItem(window.tokenName);

        return {
            ...state,
            ...{
                token: null,
                user: null,
                isLoggedIn: false,
            }
        };
    },

});
