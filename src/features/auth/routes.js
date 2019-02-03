import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import IsAnonymous from '../../common/services/user/guards/IsAnonymous';
import IsLoggedIn from '../../common/services/user/guards/IsLoggedIn';
import LoginGuard from '../../common/services/user/guards/LoginGuard';
import { NotFound } from '../../common/components';

import ForgottenPassword from './components/ForgottenPassword';
import Login from './components/Login';
import Logout from './components/Logout';
import PageLayout from './components/PageLayout';
import ResetPassword from './components/ResetPassword';
import SignUp from './components/SignUp';

const AuthRoutes = () => (
  <PageLayout>
    <Switch>
      <Route exact path="/auth" render={() => <Redirect to="/auth/login" />} />
      <Route exact path="/auth/login" component={LoginGuard(Login)} />
      <Route exact path="/auth/logout" component={IsLoggedIn(Logout)} />
      <Route exact path="/auth/sign-up" component={IsAnonymous(SignUp)} />
      <Route exact path="/auth/forgotten-password" component={IsAnonymous(ForgottenPassword)} />
      <Route
        exact
        path="/auth/reset-password/:passwordResetToken"
        component={IsAnonymous(ResetPassword)}
      />
      <Route component={NotFound} />
    </Switch>
  </PageLayout>
);

export default AuthRoutes;
