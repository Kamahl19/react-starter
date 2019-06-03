import { createActionCreator, createInitialState, createReducer } from '../redux-helpers';

// TODO

export const GLOBAL = Symbol('GLOBAL');
export const NO_SPINNER = Symbol('NO_SPINNER');

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
const initialState = createInitialState({});

export default createReducer(initialState, {
  [START]: (state, id = GLOBAL) =>
    id === NO_SPINNER
      ? state
      : {
          ...state,
          [id]: state[id] ? state[id] + 1 : 1,
        },
  [FINISH]: (state, id = GLOBAL) =>
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
const selectSpinner = state => state.spinner;

export const selectIsInProgress = (state, id = GLOBAL) => !!selectSpinner(state)[id];
