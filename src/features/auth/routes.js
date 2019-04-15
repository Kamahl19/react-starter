import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { NotFound } from '../../common/components';

import IsAnonymous from './guards/IsAnonymous';
import IsLoggedIn from './guards/IsLoggedIn';
import LoginGuard from './guards/LoginGuard';
import PageLayout from './components/PageLayout';
import ForgottenPassword from './features/ForgottenPassword';
import Login from './features/Login';
import Logout from './features/Logout';
import ResetPassword from './features/ResetPassword';
import SignUp from './features/SignUp';

export const AUTH_ROUTE_PREFIX = '/auth';

export const AUTH_ROUTER_PATHS = {
  login: `${AUTH_ROUTE_PREFIX}/login`,
  logout: `${AUTH_ROUTE_PREFIX}/logout`,
  signUp: `${AUTH_ROUTE_PREFIX}/sign-up`,
  forgottenPassword: `${AUTH_ROUTE_PREFIX}/forgotten-password`,
  resetPassword: `${AUTH_ROUTE_PREFIX}/reset-password/:passwordResetToken`,
};

const AuthRoutes = () => (
  <PageLayout>
    <Switch>
      <Route
        exact
        path={AUTH_ROUTE_PREFIX}
        render={() => <Redirect to={AUTH_ROUTER_PATHS.login} />}
      />
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
  </PageLayout>
);

export default AuthRoutes;
