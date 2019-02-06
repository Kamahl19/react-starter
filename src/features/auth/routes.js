import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NotFound } from '../../common/components';

import { AUTH_ROUTER_PATHS } from './constants';
import IsAnonymous from './guards/IsAnonymous';
import IsLoggedIn from './guards/IsLoggedIn';
import LoginGuard from './guards/LoginGuard';
import ForgottenPassword from './features/ForgottenPassword';
import Login from './features/Login';
import Logout from './features/Logout';
import ResetPassword from './features/ResetPassword';
import SignUp from './features/SignUp';

const AuthRoutes = () => (
  <Switch>
    <Route exact path={AUTH_ROUTER_PATHS.login} component={LoginGuard(Login)} />
    <Route exact path={AUTH_ROUTER_PATHS.logout} component={IsLoggedIn(Logout)} />
    <Route exact path={AUTH_ROUTER_PATHS.signUp} component={IsAnonymous(SignUp)} />
    <Route
      exact
      path={AUTH_ROUTER_PATHS.forgottenPassword}
      component={IsAnonymous(ForgottenPassword)}
    />
    <Route exact path={AUTH_ROUTER_PATHS.resetPassword} component={IsAnonymous(ResetPassword)} />
    <Route component={NotFound} />
  </Switch>
);

export default AuthRoutes;
