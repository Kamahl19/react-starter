import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { NotFound } from 'common/components';

import { AUTH_ROUTE_PREFIX, AUTH_ROUTER_PATHS } from './constants';
import IsAnonymous from './guards/IsAnonymous';
import LoginGuard from './guards/LoginGuard';
import LogoutGuard from './guards/LogoutGuard';
import ForgottenPassword from './features/ForgottenPassword';
import Login from './features/Login';
import Logout from './features/Logout';
import ResetPassword from './features/ResetPassword';
import ActivateUser from './features/ActivateUser';
import SignUp from './features/SignUp';

const LoginPage = LoginGuard(Login);
const LogoutPage = LogoutGuard(Logout);
const SignUpPage = IsAnonymous(SignUp);
const ForgottenPasswordPage = IsAnonymous(ForgottenPassword);
const ResetPasswordPage = IsAnonymous(ResetPassword);

const AuthRoutes = () => (
  <Switch>
    <Route
      exact
      path={AUTH_ROUTE_PREFIX}
      render={() => <Redirect to={AUTH_ROUTER_PATHS.login} />}
    />
    <Route exact path={AUTH_ROUTER_PATHS.login} component={LoginPage} />
    <Route exact path={AUTH_ROUTER_PATHS.logout} component={LogoutPage} />
    <Route exact path={AUTH_ROUTER_PATHS.signUp} component={SignUpPage} />
    <Route exact path={AUTH_ROUTER_PATHS.forgottenPassword} component={ForgottenPasswordPage} />
    <Route exact path={AUTH_ROUTER_PATHS.resetPassword} component={ResetPasswordPage} />
    <Route exact path={AUTH_ROUTER_PATHS.activateUser} component={ActivateUser} />
    <Route component={NotFound} />
  </Switch>
);

export default AuthRoutes;
