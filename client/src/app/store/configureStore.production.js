import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '@src/app/reducers/rootReducer';

const enhancer = compose(
  applyMiddleware(
    thunk,
    routerMiddleware(hashHistory),
  )
);

export default (initialState) => createStore(rootReducer, initialState, enhancer);
