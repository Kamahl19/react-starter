import { createActionCreator, createReducer } from '../redux-helpers';

// TODO

type TODO = any;

export const GLOBAL = 'GLOBAL';
export const NO_SPINNER = 'NO_SPINNER';

/**
 * ACTION TYPES
 */
const START = 'spinner/START';
const FINISH = 'spinner/FINISH';

/**
 * ACTIONS
 */
export const startSpinnerAction = createActionCreator(START);
export const finishSpinnerAction = createActionCreator(FINISH);

/**
 * REDUCERS
 */
const initialState = {};

export default createReducer(initialState, {
  [START]: (state: TODO, id = GLOBAL) =>
    id === NO_SPINNER
      ? state
      : {
          ...state,
          [id]: state[id] ? state[id] + 1 : 1,
        },
  [FINISH]: (state: TODO, id = GLOBAL) =>
    id === NO_SPINNER
      ? state
      : {
          ...state,
          [id]: state[id] > 0 ? state[id] - 1 : 0,
        },
});

/**
 * SELECTORS
 */
const selectSpinner = (state: TODO) => state.spinner;

export const selectIsInProgress = (state: TODO, id = GLOBAL) => !!selectSpinner(state)[id];
