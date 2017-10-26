import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { I18nextProvider } from 'react-i18next';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';

import i18n from '../i18n';
import routes from '../routes';
import configureStore from '../store/configureStore';
import {
  prepareRequestInterceptor,
  handleResponsesInterceptor,
} from '../../common/services/apiClient';
import { reloginRequest } from '../../features/auth/ducks';
import App from './App';
import ScrollToTop from './ScrollToTop';

const history = createHistory();
const { store, persistor } = configureStore(history);

prepareRequestInterceptor(store);
handleResponsesInterceptor(store);

function relogin() {
  const state = store.getState();

  if (state && state.auth && state.auth.token) {
    store.dispatch(reloginRequest());
  }
}

const Root = () => (
  <I18nextProvider i18n={i18n}>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <PersistGate loading={<div />} persistor={persistor} onBeforeLift={relogin}>
          <ConnectedRouter history={history}>
            <ScrollToTop>
              <App>{routes}</App>
            </ScrollToTop>
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </LocaleProvider>
  </I18nextProvider>
);

export default Root;
