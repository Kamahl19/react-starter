import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as modal } from 'redux-modal';

import user, { LOGOUT } from '../../common/services/user';
import spinner from '../../common/services/spinner';

console.log(LOGOUT);

const rootReducer = combineReducers({
  user,
  spinner,
  modal,
  router: routerReducer,
});

export default (state, action) =>
  action.type === LOGOUT ? rootReducer(undefined, action) : rootReducer(state, action);
