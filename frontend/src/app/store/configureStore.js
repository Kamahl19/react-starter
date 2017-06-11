import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { asyncLocalStorage } from 'redux-persist/storages';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, routerMiddleware(hashHistory)];

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
          storage: asyncLocalStorage,
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
