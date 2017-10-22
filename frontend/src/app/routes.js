import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IsLoggedIn } from '../features/auth/utils';
import AuthRoutes from '../features/auth/routes';
import { NotFound } from './components';

export default (
  <Switch>
    <Route exact path="/" render={() => <h1>Welcome</h1>} />

    <Route exact path="/me" component={IsLoggedIn(() => <h1>User Profile</h1>)} />

    <Route path="/auth" component={AuthRoutes} />

    <Route component={NotFound} />
  </Switch>
);
