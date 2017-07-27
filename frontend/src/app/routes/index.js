import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { IsAnonymous, IsLoggedIn, LoginWrapper } from '../../features/auth/utils';
import {
  LoginContainer,
  SignUpContainer,
  ForgottenPasswordContainer,
  ResetPasswordContainer,
  UserActivationContainer,
} from '../../features/auth/containers';
import NotFound from '../../features/not-found/NotFound';

export default (
  <Switch>
    <Route exact path="/" render={() => <h1>Welcome</h1>} />

    <Route exact path="/auth" component={() => <Redirect to="/auth/login" />} />
    <Route path="/auth/login" component={LoginWrapper(LoginContainer)} />
    <Route path="/auth/sign-up" component={IsAnonymous(SignUpContainer)} />
    <Route path="/auth/forgotten-password" component={IsAnonymous(ForgottenPasswordContainer)} />
    <Route
      path="/auth/reset-password/:passwordResetToken"
      component={IsAnonymous(ResetPasswordContainer)}
    />
    <Route path="/auth/activate/:userId/:activationToken" component={UserActivationContainer} />

    <Route path="/me" component={IsLoggedIn(() => <h1>User Profile</h1>)} />

    <Route component={NotFound} />
  </Switch>
);
