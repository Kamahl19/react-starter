import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { isActionOf } from 'typesafe-actions';

import user, { logoutAction } from 'common/services/user';

import { RootState } from './';

export default function createRootReducer(history: History): typeof rootReducer {
  const rootReducer = combineReducers({
    user,
    router: connectRouter(history),
  });

  return (state, action) =>
    isActionOf(logoutAction, action)
      ? rootReducer(state ? ({ router: state.router } as RootState) : undefined, action)
      : rootReducer(state, action);
}
