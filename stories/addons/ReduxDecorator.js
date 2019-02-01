import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const createReduxDecorator = reducers => story => (
  <Provider store={createStore(combineReducers(reducers))}>{story()}</Provider>
);

export default createReduxDecorator;
