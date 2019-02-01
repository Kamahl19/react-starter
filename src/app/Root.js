import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Route, Switch } from 'react-router-dom';

import RouterScrollToTop from '../packages/router-scroll-to-top';

// must be first
import { store, persistor, history } from './store/configureStore';
// order matters
import IsLoggedIn from '../common/services/user/guards/IsLoggedIn';
import { reloginAction, selectToken } from '../common/services/user';
import ErrorBoundary from './components/ErrorBoundary';
import AuthApp from '../features/auth/AuthApp';
import AccountApp from '../features/account/AccountApp';

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
                <Route path="/auth" component={AuthApp} />
                <Route exact path="/" component={IsLoggedIn(AccountApp)} />
              </Switch>
            </RouterScrollToTop>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </LocaleProvider>
  </ErrorBoundary>
);

export default Root;
