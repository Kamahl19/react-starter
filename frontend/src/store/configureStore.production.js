import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '@reducers';
import apiMiddleware from './callApiMiddleware';
import validationMiddleware from './validationMiddleware';

const enhancer = compose(
    applyMiddleware(
        validationMiddleware,
        apiMiddleware,
        thunk,
        routerMiddleware(hashHistory),
    )
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    return store;
}
