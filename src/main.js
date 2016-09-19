import { polyfill } from 'es6-promise';

import '@styles/main.less';

import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Root } from '@containers';
import configureStore from '@store/configureStore';

polyfill();

window.backendUrl = 'http://localhost:3001/api';
window.tokenName = 'react-starter-token';

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

// TODO - redux saga
// TODO - api middleware
// TODO - error middleware
// TODO - router v4
// TODO - HOC auth rewrite to functions
