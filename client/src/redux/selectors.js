import { createSelector } from 'reselect';

export const authIsLoggedInSelector = (state) => state.auth.isLoggedIn;

export const isAuthenticatingSelector = (state) => state.auth.isAuthenticating;

export const authUserSelector = (state) => state.auth.user;

export const authUserNameSelector = createSelector(
    authUserSelector,
    (user) => (user && user.name) || '',
);

export const paramsUserIdSelector = (undefined, props) => props.params && props.params.userId;

export const makeUserIdFromUrlSelector = () =>
    createSelector(
        authUserSelector,
        paramsUserIdSelector,
        (user, paramUserId) => paramUserId || (user && user.id) || '',
    );

export const canDeleteUserSelector = createSelector(
    authIsLoggedInSelector,
    authUserSelector,
    (isLoggedIn, user) => isLoggedIn && user && user.isAdmin,
);

export const unfinishedRequestsSelector = (state) => state.loader.unfinishedRequests;

export const showLoaderSelector = createSelector(
    unfinishedRequestsSelector,
    (unfinishedRequests) => !!unfinishedRequests.length,
);

export const usersSelector = (state) => state.user.users;

export const userDetailSelector = (state) => state.user.user;
