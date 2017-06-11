import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { IsAnonymous, IsLoggedIn, LoginWrapper } from '@src/features/auth/utils';
import App from '@src/app/containers/App';
import {
  LoginContainer,
  SignUpContainer,
  ForgottenPasswordContainer,
  ResetPasswordContainer,
  UserProfileContainer,
  UserActivationContainer,
} from '@src/features/auth/containers';
import NotFound from '@src/features/not-found/NotFound';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={() => <h1>Welcome</h1>} />

    <Route path="auth">
      <IndexRedirect to="login" />
      <Route path="login" component={LoginWrapper(LoginContainer)} />
      <Route path="sign-up" component={IsAnonymous(SignUpContainer)} />
      <Route path="forgotten-password" component={IsAnonymous(ForgottenPasswordContainer)} />
      <Route
        path="reset-password/:passwordResetToken"
        component={IsAnonymous(ResetPasswordContainer)}
      />
      <Route path="activate/:userId/:activationToken" component={UserActivationContainer} />
    </Route>

    <Route path="me" component={IsLoggedIn(UserProfileContainer)} />

    <Route path="*" component={NotFound} />

  </Route>
);
