import actionTypes from '@src/redux/actionTypes';

const {
    REQUEST, SUCCESS, FAILURE, LOGIN_USER, LOGOUT_USER, FETCH_USER,
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

export const loginUserRequest = () => ({
    type: `${LOGIN_USER}_${REQUEST}`,
});

export const loginUserFailure = () => ({
    type: `${LOGIN_USER}_${FAILURE}`,
});

export const loginUserWithToken = (user, token) => ({
    type: `${LOGIN_USER}_${SUCCESS}`,
    payload: {
        user,
        token,
    }
});

/**
 * Logout
 */
export const logout = () => ({
    type: LOGOUT_USER
});

/**
 * Fetch User data
 */
export const fetchUser = (userId) => ({
    typeName: FETCH_USER,
    api: {
        path: `/users/${userId}`,
    }
});
