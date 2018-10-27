import { combineReducers } from 'redux';
import { connect } from 'react-redux';
import { put } from 'redux-saga/effects';

import { createActionCreator, createReducer } from '../utils/reduxHelpers';

/**
 * ACTION TYPES
 */
const START_API_CALL = 'spinner/START_API_CALL';
const FINISH_API_CALL = 'spinner/FINISH_API_CALL';

/**
 * ACTIONS
 */
export const startApiCallAction = createActionCreator(START_API_CALL);
export const finishApiCallAction = createActionCreator(FINISH_API_CALL);

/**
 * REDUCERS
 */
const initialState = {
  globalCounter: 0,
  apiCalls: {},
};

const globalCounter = createReducer(initialState.globalCounter, {
  [START_API_CALL]: (state, payload) =>
    payload.apiCallId || payload.apiCallId === null ? state : state + 1,
  [FINISH_API_CALL]: (state, payload) =>
    payload.apiCallId || payload.apiCallId === null ? state : state - 1,
});

const apiCalls = createReducer(initialState.apiCalls, {
  [START_API_CALL]: (state, payload) =>
    payload.apiCallId
      ? {
          ...state,
          [payload.apiCallId]: state[payload.apiCallId] ? state[payload.apiCallId] + 1 : 1,
        }
      : state,
  [FINISH_API_CALL]: (state, payload) =>
    payload.apiCallId
      ? {
          ...state,
          [payload.apiCallId]: Math.max(state[payload.apiCallId] - 1, 0),
        }
      : state,
});

export default combineReducers({
  globalCounter,
  apiCalls,
});

/**
 * SELECTORS
 */
const selectSpinner = state => state.spinner;
const selectIsInProgress = (state, apiCallId) => !!selectSpinner(state).apiCalls[apiCallId];
const selectGlobalCounter = state => !!selectSpinner(state).globalCounter;

/**
 * DECORATORS
 */
export function withApiCall(apiCallId, saga) {
  return function*(...args) {
    yield put(startApiCallAction({ apiCallId }));
    yield* saga.apply(saga, args);
    yield put(finishApiCallAction({ apiCallId }));
  };
}

export const connectSpinner = apiCallIds => Component =>
  connect(
    state =>
      apiCallIds
        ? Object.entries(apiCallIds).reduce(
            (acc, [propName, apiCallId]) => ({
              ...acc,
              [propName]: selectIsInProgress(state, apiCallId),
            }),
            {}
          )
        : {
            isLoading: selectGlobalCounter(state),
          }
  )(Component);
