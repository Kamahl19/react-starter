import { combineReducers } from 'redux';

import { createActionCreator, createReducer } from '../redux-helpers';

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
export const selectIsInProgress = (state, apiCallId) => !!selectSpinner(state).apiCalls[apiCallId];
export const selectGlobalCounter = state => !!selectSpinner(state).globalCounter;
