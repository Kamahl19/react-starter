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
    authSelector: (state) => state.auth,
    predicate: (auth) => auth.isLoggedIn,
    authenticatingSelector: (state) => state.auth.isAuthenticating,
    failureRedirectPath: '/login',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsLoggedIn',
});

export const IsAdmin = UserAuthWrapper({
    authSelector: (state) => state.auth,
    predicate: (auth) => auth.user && auth.user.isAdmin,
    authenticatingSelector: (state) => state.auth.isAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAdmin',
    allowRedirectBack: false,
});

export const IsAnonymous = UserAuthWrapper({
    authSelector: (state) => state.auth,
    predicate: (auth) => !auth.isLoggedIn,
    authenticatingSelector: (state) => state.auth.isAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAnonymous',
    allowRedirectBack: false,
});

export const LoginWrapper = UserAuthWrapper({
  authSelector: (state) => state.auth,
  predicate: (auth) => !auth.isLoggedIn,
  authenticatingSelector: (state) => state.auth.isAuthenticating,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'LoginWrapper',
  allowRedirectBack: false,
})
