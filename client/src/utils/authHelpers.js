import jwtDecode from 'jwt-decode';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';

export const decodeToken = (token) => jwtDecode(token);

export const isTokenValid = (token) => {
    if (token) {
        if (decodeToken(token).exp > (new Date().getTime() / 1000)) {
            return true;
        }
    }

    return false;
};

export const IsLoggedIn = UserAuthWrapper({
    authSelector: (state) => state.user,
    predicate: (user) => user.isLoggedIn,
    authenticatingSelector: (state) => state.user.isAuthenticating,
    failureRedirectPath: '/login',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsLoggedIn',
});

export const IsAdmin = UserAuthWrapper({
    authSelector: (state) => state.user,
    predicate: (user) => user.user && user.user.isAdmin,
    authenticatingSelector: (state) => state.user.isAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAdmin',
    allowRedirectBack: false,
});
