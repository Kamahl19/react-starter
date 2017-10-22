import './app/styles/main.css';
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';

import { Root } from './app/containers';
import configureStore from './app/store/configureStore';
import { prepareRequestInterceptor, handleResponsesInterceptor } from './common/services/apiClient';
import { reloginRequest } from './features/auth/ducks';

async function init() {
  const history = createHistory();
  const store = await configureStore(history);

  prepareRequestInterceptor(store);
  handleResponsesInterceptor(store);

  const state = store.getState();

  if (state && state.auth && state.auth.token) {
    store.dispatch(reloginRequest());
  }

  render(<Root store={store} history={history} />, document.getElementById('root'));
}

init();
