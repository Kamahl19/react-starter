import '@src/styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Root } from '@src/containers';
import configureStore from '@src/redux/configureStore';

window.backendUrl = 'http://localhost:3001/api';
window.tokenName = 'react-starter-token';

const store = configureStore();

const history = syncHistoryWithStore(hashHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);

// TODO - reselect
// TODO - flow
// TODO - router v4
