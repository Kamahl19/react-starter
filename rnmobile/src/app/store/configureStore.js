import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  if (__DEV__) {
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
          storage: AsyncStorage,
          whitelist: ['auth'],
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
