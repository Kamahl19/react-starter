import { createReducer } from '@redux/reduxHelpers';
import actionTypes from '@redux/actionTypes';

const {
    REQUEST, SUCCESS, FAILURE,
    LOGIN_USER, LOGOUT_USER, FETCH_USER,
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

    [FETCH_USER]: {
        [REQUEST]: (state) => ({
            ...state,
            ...{
                user: null,
            }
        }),
        [SUCCESS]: (state, payload) => {
            const { user } = payload;

            return {
                ...state,
                ...{
                    user,
                }
            };
        },
        [FAILURE]: (state) => ({
            ...state,
            ...{
                user: null,
            }
        }),
    }

});
