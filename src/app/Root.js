import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { I18nextProvider } from 'react-i18next';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';

import { reloginAction } from '../common/services/user';
import i18n from '../common/services/i18n';

import { store, persistor, history } from './store/configureStore';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';
import Routes from './Routes';
import App from './App';

function relogin() {
  if (history.location.pathname !== '/auth/logout') {
    const state = store.getState();

    // TODO is check this necessary ?
    if (state && state.auth && state.auth.token) {
      store.dispatch(reloginAction());
    }
  }
}

const Root = () => (
  <ErrorBoundary>
    <I18nextProvider i18n={i18n}>
      <LocaleProvider locale={enUS}>
        <Provider store={store}>
          <PersistGate loading={<div />} persistor={persistor} onBeforeLift={relogin}>
            <ConnectedRouter history={history}>
              <ScrollToTop>
                <App>{Routes}</App>
              </ScrollToTop>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </LocaleProvider>
    </I18nextProvider>
  </ErrorBoundary>
);

export default Root;
