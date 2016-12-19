import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '@src/ducks/auth';
import products from '@src/ducks/products';
import loader from '@src/ducks/loader';

const appReducer = combineReducers({
    auth,
    products,
    loader,
    routing: routerReducer,
});

export default (state, action) => {
    // Uncomment only if you want to clear the whole store after user logout
    // if (action.type === LOGOUT_USER) {
    //     return appReducer(undefined, action);
    // }

    return appReducer(state, action);
};
