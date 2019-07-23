import { createStandardAction, createReducer, ActionType } from 'typesafe-actions';

export const GLOBAL = 'GLOBAL';

/**
 * ACTIONS
 */
export const startSpinnerAction = createStandardAction('spinner/START')<string | undefined>();
export const finishSpinnerAction = createStandardAction('spinner/FINISH')<string | undefined>();

const actions = { startSpinnerAction, finishSpinnerAction };
export type SpinnerActions = ActionType<typeof actions>;

type SpinnerState = Record<string, number>;

export interface SpinnerKeyInState {
  spinner: SpinnerState;
}

/**
 * REDUCERS
 */
const initialState: SpinnerState = {};

export default createReducer(initialState)
  .handleAction(startSpinnerAction, (state, { payload: id = GLOBAL }) => ({
    ...state,
    [id]: state[id] ? state[id] + 1 : 1,
  }))
  .handleAction(finishSpinnerAction, (state, { payload: id = GLOBAL }) => ({
    ...state,
    [id]: state[id] > 0 ? state[id] - 1 : 0,
  }));

/**
 * SELECTORS
 */
const selectSpinner = <S extends SpinnerKeyInState>(state: S) => state.spinner;

export const selectIsInProgress = <S extends SpinnerKeyInState>(state: S, id: string) =>
  !!selectSpinner(state)[id];
