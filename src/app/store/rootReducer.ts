import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { isActionOf } from 'typesafe-actions';

import { spinnerReducer as spinner } from 'packages/spinner';

import { RootState } from './';
import user, { logoutAction } from 'common/services/user';

export default function createRootReducer(history: History): typeof rootReducer {
  const rootReducer = combineReducers({
    user,
    spinner,
    router: connectRouter(history),
  });

  return (state, action) =>
    isActionOf(logoutAction, action)
      ? rootReducer(state ? ({ router: state.router } as RootState) : undefined, action)
      : rootReducer(state, action);
}
