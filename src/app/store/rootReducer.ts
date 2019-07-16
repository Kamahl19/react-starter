import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { isActionOf } from 'typesafe-actions';

import { spinnerReducer as spinner } from 'packages/spinner';

import user, { logoutAction } from 'common/services/user';

export default function createRootReducer(history: History) {
  const rootReducer = combineReducers({
    user,
    spinner,
    router: connectRouter(history),
  });

  return ((state, action) =>
    isActionOf(logoutAction, action)
      ? rootReducer(undefined, action)
      : rootReducer(state, action)) as typeof rootReducer;
}
