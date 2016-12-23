import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from '@src/modules/auth/ducks/authDucks';
import products from '@src/modules/products/ducks/productsDucks';
import loader from '@src/modules/loader/ducks/loader';

const rootReducer = combineReducers({
    auth,
    products,
    loader,
    routing: routerReducer,
});

export default (state, action) => {
    // Uncomment only if you want to clear the whole store after user logout
    // if (action.type === LOGOUT_USER) {
    //     return rootReducer(undefined, action);
    // }

    return rootReducer(state, action);
};
