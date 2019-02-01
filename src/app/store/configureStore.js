import { applyMiddleware, createStore, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import { isDev } from '../../config';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const history = createHistory();

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
  rootReducer
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
