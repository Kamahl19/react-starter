import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth, { LOGOUT_USER } from '@src/ducks/auth';
import users from '@src/ducks/users';
import loader from '@src/ducks/loader';

const appReducer = combineReducers({
    auth,
    users,
    loader,
    routing: routerReducer,
});

export default (state, action) => {
    if (action.type === LOGOUT_USER) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};
