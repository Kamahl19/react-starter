import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import constants from '@constants';
import auth from './auth';
import loader from './loader';

const appReducer = combineReducers({
    auth,
    loader,
    routing: routerReducer,
});

export default (state, action) => {
    if (action.type === constants.LOGOUT_USER) {
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
};
