import { createConstants } from '@src/redux/reduxHelpers';

export default createConstants(
    'REQUEST',
    'SUCCESS',
    'FAILURE',

    'LOGIN_USER',
    'LOGOUT_USER',
    'FETCH_USER',
);
