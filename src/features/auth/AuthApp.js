import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Layout, NotFound, Footer } from '../../common/components';
import IsLoggedIn from '../../common/services/user/guards/IsLoggedIn';

import IsAnonymous from './utils/IsAnonymous';
import LoginWrapper from './utils/LoginWrapper';
// import RedirectSpinner from './utils/RedirectSpinner';
import ForgottenPasswordContainer from './containers/ForgottenPasswordContainer';
import LoginContainer from './containers/LoginContainer';
// import ConfirmLoginContainer from './containers/ConfirmLoginContainer';
import LogoutContainer from './containers/LogoutContainer';
import ResetPasswordContainer from './containers/ResetPasswordContainer';
import SignUpContainer from './containers/SignUpContainer';
// import VerifyEmailContainer from './containers/VerifyEmailContainer';
import Header from './components/Header';

const AccountApp = () => (
  <Layout>
    <Header />
    <Layout.Content>
      <Switch>
        <Route exact path="/auth" render={() => <Redirect to="/auth/login" />} />
        <Route exact path="/auth/login" component={LoginWrapper(LoginContainer)} />
        {/* <Route exact path="/auth/confirm-login" component={LoginWrapper(ConfirmLoginContainer)} /> */}
        <Route exact path="/auth/logout" component={IsLoggedIn(LogoutContainer)} />
        <Route exact path="/auth/sign-up" component={IsAnonymous(SignUpContainer)} />
        {/* <Route exact path="/auth/verify-email" component={IsAnonymous(VerifyEmailContainer)} /> */}
        <Route
          exact
          path="/auth/forgotten-password"
          component={IsAnonymous(ForgottenPasswordContainer)}
        />
        <Route exact path="/auth/reset-password" component={IsAnonymous(ResetPasswordContainer)} />
        <Route component={NotFound} />
      </Switch>
    </Layout.Content>
    <Footer />
  </Layout>
);

export default AccountApp;
