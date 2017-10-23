import { applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import Reactotron from 'reactotron-react-native';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware({
    sagaMonitor: Reactotron.createSagaMonitor(),
  });

  const middlewares = [sagaMiddleware, logger];

  return new Promise((resolve, reject) => {
    const store = Reactotron.createStore(
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
