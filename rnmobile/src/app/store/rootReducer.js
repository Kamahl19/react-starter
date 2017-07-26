import { combineReducers } from 'redux';
import auth, { LOGOUT } from '../../features/auth/ducks';

const rootReducer = combineReducers({
  auth,
});

export default (state, action) => {
  if (action.type === LOGOUT) {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
