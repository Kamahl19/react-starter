import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(
    {
      key: 'root',
      storage: localForage,
      whitelist: ['auth'],
      debug: process.env.NODE_ENV === 'development',
    },
    rootReducer
  );

  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  const store = createStore(persistedReducer, compose(applyMiddleware(...middlewares)));

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
