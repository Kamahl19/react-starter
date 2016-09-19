import { createReducer } from '@utils/helpers';
import constants from '@constants';

const {
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
    LOGOUT_USER,
    FETCH_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_REQUEST,
} = constants;

const initialState = {
    token: null,
    user: null,
    isLoggedIn: false,
    isAuthenticating: false,
};

export default createReducer(initialState, {
    [LOGIN_USER_REQUEST]: (state) => ({
        ...state,
        ...{
            isAuthenticating: true,
        }
    }),
    [LOGIN_USER_SUCCESS]: (state, payload) => {
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
    [LOGIN_USER_FAILURE]: (state) => {
        localStorage.removeItem(window.tokenName);

        return {
            ...state,
            ...{
                isAuthenticating: false,
            }
        };
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

    [FETCH_USER_SUCCESS]: (state, payload) => {
        const { user } = payload;

        return {
            ...state,
            ...{
                user,
                isAuthenticating: false, // TODO - why is it here
            }
        };
    },
    [FETCH_USER_FAILURE]: (state) => ({
        ...state,
        ...{
            user: null,
            isAuthenticating: false, // TODO - why is it here
        }
    }),
    [FETCH_USER_REQUEST]: (state) => ({
        ...state,
        ...{
            user: null,
            isAuthenticating: true, // TODO - why is it here
        }
    }),
});
