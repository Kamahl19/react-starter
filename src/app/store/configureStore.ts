import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import { isDev } from 'config';

import history from '../history';

import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    version: 1,
    whitelist: ['authService'],
    debug: isDev,
  },
  createRootReducer(history)
);

const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (isDev) {
  const { createLogger } = require('redux-logger');
  const ImmutableStateInvariant = require('redux-immutable-state-invariant').default;

  middlewares.push(createLogger(), ImmutableStateInvariant());
}

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
