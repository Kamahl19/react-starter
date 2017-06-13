import '@src/app/styles/main.less';
import React from 'react';
import { render } from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { Root } from '@src/app/containers';
import configureStore from '@src/app/store/configureStore';
import {
  prepareRequestInterceptor,
  handleResponsesInterceptor,
} from '@src/common/services/apiClient';
import { relogin } from '@src/features/auth/ducks';

async function init() {
  const history = createHistory();
  const store = await configureStore(history);

  prepareRequestInterceptor(store);
  handleResponsesInterceptor(store);

  const state = store.getState();

  if (state && state.auth) {
    store.dispatch(relogin(state.auth));
  }

  render(<Root store={store} history={history} />, document.getElementById('root'));
}

init();
