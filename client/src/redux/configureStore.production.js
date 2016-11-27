import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '@src/reducers';
import apiMiddleware from './callApiMiddleware';

const enhancer = compose(
    applyMiddleware(
        apiMiddleware,
        thunk,
        routerMiddleware(hashHistory),
    )
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    return store;
}
