import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { routerActions } from 'react-router-redux';
import App from '@containers/App';
import { LoginContainer, HomeContainer, UserProfileContainer } from '@containers/screens';
import { Error404 } from '@components/screens';
import { UserAuthWrapper } from 'redux-auth-wrapper';

const IsLoggedIn = UserAuthWrapper({
    authSelector: (state) => state.user,
    predicate: (user) => user.isLoggedIn,
    authenticatingSelector: (state) => state.user.isAuthenticating,
    failureRedirectPath: '/login',
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'IsLoggedIn',
});

export default (
    <Route path="/" component={App}>

        <IndexRoute component={HomeContainer} />

        <Route path="me" component={IsLoggedIn(UserProfileContainer)} />

        <Route path="login" component={LoginContainer} />

        <Route path="*" component={Error404} />

    </Route>
);
