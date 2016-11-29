import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '@src/containers/App';
import { LoginContainer, HomeContainer, UserProfileContainer } from '@src/containers/screens';
import { Error404 } from '@src/components/screens';
import { IsLoggedIn } from '@src/utils/authHelpers';

export default (
    <Route path="/" component={App}>

        <IndexRoute component={HomeContainer} />

        <Route path="me" component={IsLoggedIn(UserProfileContainer)} />

        <Route path="login" component={LoginContainer} />

        <Route path="*" component={Error404} />

    </Route>
);
