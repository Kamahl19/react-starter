import { applyMiddleware, createStore, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import { isDev } from 'config';

import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const migrations = {
  // Add redux migrations here
};

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 0,
    storage: localForage,
    whitelist: ['user'],
    debug: isDev,
    migrate: createMigrate(migrations, { debug: isDev }),
  },
  createRootReducer(history)
);

const middlewares = [sagaMiddleware, routerMiddleware(history)];

if (isDev) {
  const { createLogger } = require('redux-logger');
  const ImmutableStateInvariant = require('redux-immutable-state-invariant').default;

  middlewares.push(createLogger(), ImmutableStateInvariant());
}

const composeEnhancers =
  isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middlewares)));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor, history };