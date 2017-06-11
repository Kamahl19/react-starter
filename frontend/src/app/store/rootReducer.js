import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth, { LOGOUT } from '@src/features/auth/ducks';
import spinner from '@src/features/spinner/ducks';
import modal from '@src/features/modal/ducks';

const rootReducer = combineReducers({
  auth,
  spinner,
  modal,
  routing: routerReducer,
});

export default (state, action) => {
  if (action.type === LOGOUT) {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
