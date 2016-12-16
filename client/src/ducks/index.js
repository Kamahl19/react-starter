import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { LOGOUT_USER } from '@src/ducks/auth';
import auth from '@src/ducks/auth';
import user from '@src/ducks/user';
import loader from '@src/ducks/loader';

const appReducer = combineReducers({
    auth,
    user,
    loader,
    routing: routerReducer,
});

export default (state, action) => {
    if (action.type === LOGOUT_USER) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};
