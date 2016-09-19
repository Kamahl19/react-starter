import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '@containers/App';
import { IndexPage, LoginPage, Error404 } from '@components/screens';
import { IsVisitor as isVisitor } from '@containers/auth';

export default (
    <Route path="/" component={App}>

        <IndexRoute component={IndexPage} />

        <Route path="login" component={isVisitor(LoginPage)} />

        <Route path="*" component={Error404} />

    </Route>
);
