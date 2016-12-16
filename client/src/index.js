import '@src/styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Root } from '@src/containers';
import configureStore from '@src/store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Root store={store} history={history} />,
    document.getElementById('root')
);
