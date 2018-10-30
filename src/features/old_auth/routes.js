import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { NotFound } from '../../common/components';

import { IsAnonymous, LoginWrapper } from './utils';
import {
  ForgottenPasswordContainer,
  LoginContainer,
  ResetPasswordContainer,
  SignUpContainer,
} from './containers';

export default () => (
  <Switch>
    <Route exact path="/auth" render={() => <Redirect to="/auth/login" />} />
    <Route exact path="/auth/login" component={LoginWrapper(LoginContainer)} />
    <Route exact path="/auth/sign-up" component={IsAnonymous(SignUpContainer)} />
    <Route
      exact
      path="/auth/forgotten-password"
      component={IsAnonymous(ForgottenPasswordContainer)}
    />
    <Route
      exact
      path="/auth/reset-password/:passwordResetToken"
      component={IsAnonymous(ResetPasswordContainer)}
    />

    <Route component={NotFound} />
  </Switch>
);
