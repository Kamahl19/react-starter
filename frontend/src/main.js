import { polyfill } from 'es6-promise';

import '@styles/main.less';

import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Root } from '@containers';
import configureStore from '@redux/configureStore';

polyfill();

window.backendUrl = 'http://localhost:3001/api';
window.tokenName = 'react-starter-token';

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

// TODO - https://github.com/facebookincubator/create-react-app
// TODO - reselect
// TODO - redux saga
// TODO - flow
// TODO - router v4
