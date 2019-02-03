import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Route, Switch, Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import RouterScrollToTop from '../packages/router-scroll-to-top';

// must be first
import { store, persistor, history } from './store/configureStore';
// order matters
import { reloginAction, selectToken } from '../common/services/user';
import IsLoggedIn from '../common/services/user/guards/IsLoggedIn';
import NotFound from '../common/components/NotFound';
import AuthRoutes from '../features/auth/routes';

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
                <Route path="/auth" component={AuthRoutes} />
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
