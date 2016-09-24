import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '@containers/App';
import { HomeContainer } from '@containers/screens';
import { Error404 } from '@components/screens';
import { IsVisitor as isVisitor, LoginContainer } from '@containers/auth';

export default (
    <Route path="/" component={App}>

        <IndexRoute component={HomeContainer} />

        <Route path="login" component={isVisitor(LoginContainer)} />

        <Route path="*" component={Error404} />

    </Route>
);
