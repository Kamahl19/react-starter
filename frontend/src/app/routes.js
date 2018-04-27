import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IsLoggedIn } from '../features/auth/utils';
import WelcomeScreen from '../features/welcome/WelcomeScreen';
import AuthRoutes from '../features/auth/routes';
import { NotFound } from '../common/components';

export default (
  <Switch>
    <Route exact path="/" component={WelcomeScreen} />

    <Route exact path="/me" component={IsLoggedIn(() => <h1>User Profile</h1>)} />

    <Route path="/auth" component={AuthRoutes} />

    <Route component={NotFound} />
  </Switch>
);
