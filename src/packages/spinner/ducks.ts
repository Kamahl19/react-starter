import { createStandardAction, createReducer, ActionType } from 'typesafe-actions';
import { AppState } from '../../app/store';

export const GLOBAL = 'GLOBAL';

/**
 * ACTIONS
 */
export const startSpinnerAction = createStandardAction('spinner/START')<string>();
export const finishSpinnerAction = createStandardAction('spinner/FINISH')<string>();

const actions = { startSpinnerAction, finishSpinnerAction };
export type SpinnerActions = ActionType<typeof actions>;

type SpinnerState = {
  [key: string]: number;
};

/**
 * REDUCERS
 */
const initialState: SpinnerState = {};

export default createReducer(initialState)
  .handleAction(startSpinnerAction, (state, { payload: id }) => ({
    ...state,
    [id]: state[id] ? state[id] + 1 : 1,
  }))
  .handleAction(finishSpinnerAction, (state, { payload: id }) => ({
    ...state,
    [id]: state[id] > 0 ? state[id] - 1 : 0,
  }));

/**
 * SELECTORS
 */
const selectSpinner = (state: AppState) => state.spinner;

export const selectIsInProgress = (state: AppState, id = GLOBAL) => !!selectSpinner(state)[id];
