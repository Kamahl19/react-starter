import '@src/app/styles/main.less';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Root } from '@src/app/containers';
import configureStore from '@src/app/store/configureStore';
import {
  prepareRequestInterceptor,
  handleResponsesInterceptor,
} from '@src/common/services/apiClient';
import { relogin } from '@src/features/auth/ducks';

async function init() {
  const store = await configureStore();
  const history = syncHistoryWithStore(hashHistory, store);

  prepareRequestInterceptor(store);
  handleResponsesInterceptor(store);

  const state = store.getState();

  if (state && state.auth) {
    store.dispatch(relogin(state.auth));
  }

  render(<Root store={store} history={history} />, document.getElementById('root'));
}

init();
