import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { spinnerReducer } from 'packages/spinner';

import user, { LOGOUT } from 'common/services/user';

export default function createRootReducer(history) {
  const rootReducer = combineReducers({
    user,
    spinner: spinnerReducer,
    router: connectRouter(history),
  });

  return (state, action) =>
    action.type === LOGOUT ? rootReducer(undefined, action) : rootReducer(state, action);
}
