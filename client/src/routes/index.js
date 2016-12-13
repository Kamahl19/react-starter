import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '@src/containers/App';
import { LoginContainer, SignUpContainer, HomeContainer, UserProfileContainer } from '@src/containers/screens';
import { Error404 } from '@src/components/screens';
import { IsAnonymous, IsLoggedIn, LoginWrapper } from '@src/utils/authHelpers';

export default (
    <Route path="/" component={App}>

        <IndexRoute component={HomeContainer} />

        <Route path="users/:userId" component={UserProfileContainer} />

        <Route path="me" component={IsLoggedIn(UserProfileContainer)} />

        <Route path="login" component={LoginWrapper(LoginContainer)} />

        <Route path="sign-up" component={IsAnonymous(SignUpContainer)} />

        <Route path="*" component={Error404} />

    </Route>
);
