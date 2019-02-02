import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import RouterScrollToTop from '../packages/router-scroll-to-top';

// must be first
import { store, persistor, history } from './store/configureStore';
// order matters
import { reloginAction, selectToken } from '../common/services/user';
import IsAnonymous from '../common/services/user/guards/IsAnonymous';
import IsLoggedIn from '../common/services/user/guards/IsLoggedIn';
import LoginGuard from '../common/services/user/guards/LoginGuard';
import NotFound from '../common/components/NotFound';
import ForgottenPassword from '../features/auth/components/ForgottenPassword';
import Login from '../features/auth/components/Login';
import Logout from '../features/auth/components/Logout';
import ResetPassword from '../features/auth/components/ResetPassword';
import SignUp from '../features/auth/components/SignUp';
import AuthScreen from '../features/auth/components/Screen';

import ErrorBoundary from './components/ErrorBoundary';

// TODO this shouldnt be in Root.js, move elsewhere
function relogin() {
  if (history.location.pathname !== '/auth/logout') {
    // TODO is check this necessary ?
    if (selectToken(store.getState())) {
      store.dispatch(reloginAction());
    }
  }
}

const Root = () => (
  <ErrorBoundary>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <PersistGate loading={<div />} persistor={persistor} onBeforeLift={relogin}>
          <ConnectedRouter history={history}>
            <RouterScrollToTop>
              <Switch>
                <Route
                  path="/auth"
                  component={() => (
                    <AuthScreen>
                      <Switch>
                        <Route exact path="/auth" render={() => <Redirect to="/auth/login" />} />
                        <Route exact path="/auth/login" component={LoginGuard(Login)} />
                        <Route exact path="/auth/logout" component={IsLoggedIn(Logout)} />
                        <Route exact path="/auth/sign-up" component={IsAnonymous(SignUp)} />
                        <Route
                          exact
                          path="/auth/forgotten-password"
                          component={IsAnonymous(ForgottenPassword)}
                        />
                        <Route
                          exact
                          path="/auth/reset-password/:passwordResetToken"
                          component={IsAnonymous(ResetPassword)}
                        />
                      </Switch>
                    </AuthScreen>
                  )}
                />

                <Route
                  exact
                  path="/"
                  component={IsLoggedIn(() => (
                    <Link to="/auth/logout">
                      <Trans i18nKey="logout">Logout</Trans>
                    </Link>
                  ))}
                />

                <Route component={NotFound} />
              </Switch>
            </RouterScrollToTop>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </LocaleProvider>
  </ErrorBoundary>
);

export default Root;
