import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { LOGOUT_USER } from '@constants';
import auth from './auth';
import loader from './loader';

const appReducer = combineReducers({
    auth,
    loader,
    routing: routerReducer,
});

export default (state, action) => {
    if (action.type === LOGOUT_USER) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};
