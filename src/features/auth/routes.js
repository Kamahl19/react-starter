import React from 'react';
import { Route, Switch } from 'react-router-dom';

import IsAnonymous from '../../common/services/user/guards/IsAnonymous';
import IsLoggedIn from '../../common/services/user/guards/IsLoggedIn';
import LoginGuard from '../../common/services/user/guards/LoginGuard';
import { NotFound } from '../../common/components';

import ForgottenPassword from './features/ForgottenPassword';
import Login from './features/Login';
import Logout from './features/Logout';
import ResetPassword from './features/ResetPassword';
import SignUp from './features/SignUp';

const AuthRoutes = () => (
  <Switch>
    <Route exact path="/login" component={LoginGuard(Login)} />
    <Route exact path="/logout" component={IsLoggedIn(Logout)} />
    <Route exact path="/sign-up" component={IsAnonymous(SignUp)} />
    <Route exact path="/forgotten-password" component={IsAnonymous(ForgottenPassword)} />
    <Route
      exact
      path="/reset-password/:passwordResetToken"
      component={IsAnonymous(ResetPassword)}
    />
    <Route component={NotFound} />
  </Switch>
);

export default AuthRoutes;
