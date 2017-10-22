import { combineReducers } from 'redux';

import { createActionCreator, createReducer } from '../../../common/utils/reduxHelpers';

/**
 * ACTION TYPES
 */
export const SHOW_MODAL = 'modal/SHOW_MODAL';
export const HIDE_MODAL = 'modal/HIDE_MODAL';

/**
 * ACTIONS
 */
export const showModal = createActionCreator(SHOW_MODAL);
export const hideModal = createActionCreator(HIDE_MODAL);

/**
 * REDUCERS
 */
const initialState = {
  modals: {},
};

const modals = createReducer(initialState.modals, {
  [SHOW_MODAL]: (state, { id, data }) => ({
    ...state,
    [id]: {
      isVisible: true,
      data,
    },
  }),
  [HIDE_MODAL]: (state, id) => ({
    ...state,
    [id]: {
      isVisible: false,
      data: undefined,
    },
  }),
});

export default combineReducers({
  modals,
});

/**
 * SELECTORS
 */
export const selectModal = state => state.modal;
export const selectModals = state => selectModal(state).modals;
export const selectModalById = (state, id) => selectModals(state)[id] || {};
export const selectIsVisible = (state, id) => !!selectModalById(state, id).isVisible;
export const selectData = (state, id) => selectModalById(state, id).data;
