import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Layout, NotFound, Footer } from '../../common/components';
import IsLoggedIn from '../../common/services/user/guards/IsLoggedIn';
import IsAnonymous from '../../common/services/user/guards/IsAnonymous';
import LoginGuard from '../../common/services/user/guards/LoginGuard';

import Header from './components/Header';
import ForgottenPassword from './components/ForgottenPassword/';
import Login from './components/Login/';
import Logout from './components/Logout/';
import ResetPassword from './components/ResetPassword/';
import SignUp from './components/SignUp/';

const AuthApp = () => (
  <Layout>
    <Header />
    <Layout.Content>
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
    </Layout.Content>
    <Footer />
  </Layout>
);

export default AuthApp;
