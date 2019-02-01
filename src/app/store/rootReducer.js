import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import spinner from '../../packages/spinner';

import user, { LOGOUT } from '../../common/services/user';

const rootReducer = combineReducers({
  user,
  spinner,
  router: routerReducer,
});

export default (state, action) =>
  action.type === LOGOUT ? rootReducer(undefined, action) : rootReducer(state, action);
