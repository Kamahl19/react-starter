import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import { spinnerReducer as spinner } from 'packages/spinner';

import user, { LOGOUT } from 'common/services/user';

export default function createRootReducer(history: History) {
  const rootReducer = combineReducers({
    user,
    spinner,
    router: connectRouter(history),
  });

  return ((state, action) =>
    action.type === LOGOUT // TODO use typeof
      ? rootReducer(undefined, action)
      : rootReducer(state, action)) as typeof rootReducer;
}
