import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '@src/ducks';
import apiMiddleware from '@src/utils/api/callApiMiddleware';

const enhancer = compose(
    applyMiddleware(
        apiMiddleware,
        thunk,
        routerMiddleware(hashHistory),
    )
);

export default (initialState) => createStore(rootReducer, initialState, enhancer);
