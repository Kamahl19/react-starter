import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import localForage from 'localforage';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore(history) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }

  return new Promise((resolve, reject) => {
    const store = createStore(
      rootReducer,
      compose(autoRehydrate(), applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);

    try {
      persistStore(
        store,
        {
          storage: localForage,
          blacklist: ['spinner', 'modal'],
        },
        () => {
          resolve(store);
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
