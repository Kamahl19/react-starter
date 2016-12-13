import { createConstants } from '@src/redux/reduxHelpers';

export default createConstants(
    'REQUEST',
    'SUCCESS',
    'FAILURE',

    'LOGIN_USER',
    'LOGOUT_USER',
    'FETCH_LOGGED_IN_USER',
    'SIGN_UP',

    'UPDATE_USER',
    'DELETE_USER',
    'FETCH_USER',
    'FETCH_USERS',
);
