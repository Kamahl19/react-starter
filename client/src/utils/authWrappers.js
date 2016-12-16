import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { getIsLoggedIn, getUserIsAdmin, getIsAuthenticating } from '@src/ducks/auth';

export const IsLoggedIn = UserAuthWrapper({
    authSelector: (state) => state,
    predicate: getIsLoggedIn,
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: '/login',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsLoggedIn',
});

export const IsAdmin = UserAuthWrapper({
    authSelector: (state) => state,
    predicate: getUserIsAdmin,
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAdmin',
    allowRedirectBack: false,
});

export const IsAnonymous = UserAuthWrapper({
    authSelector: (state) => state,
    predicate: (state) => !getIsLoggedIn(state),
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsAnonymous',
    allowRedirectBack: false,
});

export const LoginWrapper = UserAuthWrapper({
    authSelector: (state) => state,
    predicate: (state) => !getIsLoggedIn(state),
    authenticatingSelector: getIsAuthenticating,
    failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'LoginWrapper',
    allowRedirectBack: false,
});
