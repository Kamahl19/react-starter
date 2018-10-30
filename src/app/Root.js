import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { I18nextProvider } from 'react-i18next';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Route, Switch } from 'react-router-dom';

// import { reloginAction } from '../common/services/user';
import i18n from '../common/services/i18n';
// import { IsLoggedIn } from '../common/services/user/guards';

import { store, persistor, history } from './store/configureStore';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

import AuthApp from '../features/auth/AuthApp';
// import AccountApp from '../features/account/AccountApp';

// function relogin() {
//   if (history.location.pathname !== '/auth/logout') {
//     const state = store.getState();

//     // TODO is check this necessary ?
//     if (state && state.auth && state.auth.token) {
//       store.dispatch(reloginAction());
//     }
//   }
// }

const Root = () => (
  <ErrorBoundary>
    <I18nextProvider i18n={i18n}>
      <LocaleProvider locale={enUS}>
        <Provider store={store}>
          <PersistGate loading={<div />} persistor={persistor} onBeforeLift={() => {}}>
            <ConnectedRouter history={history}>
              <ScrollToTop>
                <Switch>
                  <Route path="/auth" component={AuthApp} />
                  {/* <Route exact path="/" component={IsLoggedIn(AccountApp)} /> */}
                </Switch>
              </ScrollToTop>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </LocaleProvider>
    </I18nextProvider>
  </ErrorBoundary>
);

export default Root;
