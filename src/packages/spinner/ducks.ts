import { createStandardAction, createReducer, ActionType } from 'typesafe-actions';

export const GLOBAL = 'GLOBAL';

/**
 * ACTIONS
 */
export const startSpinnerAction = createStandardAction('spinner/START')<string>();
export const finishSpinnerAction = createStandardAction('spinner/FINISH')<string>();

const actions = { startSpinnerAction, finishSpinnerAction };
export type SpinnerActions = ActionType<typeof actions>;

type SpinnerState = {
  readonly [key: string]: number;
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
type TODO = any;
const selectSpinner = (state: TODO): SpinnerState => state.spinner;

export const selectIsInProgress = (state: TODO, id = GLOBAL) => !!selectSpinner(state)[id];
