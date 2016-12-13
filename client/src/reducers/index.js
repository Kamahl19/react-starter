import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { LOGOUT_USER } from '@src/redux/actionTypes';
import auth from './auth';
import user from './user';
import loader from './loader';

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
