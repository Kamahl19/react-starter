import { createConstants } from '@utils/helpers';

export default createConstants(
    'REQUEST',
    'SUCCESS',
    'FAILURE',

    'LOGIN_USER',
    'LOGIN_USER_REQUEST',
    'LOGIN_USER_FAILURE',
    'LOGIN_USER_SUCCESS',

    'LOGOUT_USER',

    'FETCH_USER',
    'FETCH_USER_SUCCESS',
    'FETCH_USER_FAILURE',
    'FETCH_USER_REQUEST',
);
