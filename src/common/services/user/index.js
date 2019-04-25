import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  createActionCreator,
  createApiActionCreators,
  createInitialState,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'packages/redux-helpers';

import api from './api';

/**
 * ACTION TYPES
 */
export const LOGIN = 'user/LOGIN';
export const RELOGIN = 'user/RELOGIN';
export const LOGOUT = 'user/LOGOUT';

/**
 * ACTIONS
 */
export const loginActions = createApiActionCreators(LOGIN);
export const reloginAction = createActionCreator(RELOGIN);
export const logoutAction = createActionCreator(LOGOUT);

/**
 * REDUCERS
 */
const initialState = createInitialState({
  isAuthenticating: false,
  profile: null,
  token: null,
});

const isAuthenticating = createReducer(initialState.isAuthenticating, {
  [RELOGIN]: () => true,
  [LOGIN]: {
    [REQUEST]: () => true,
    [SUCCESS]: () => false,
    [FAILURE]: () => false,
  },
});

const profile = createReducer(initialState.profile, {
  [LOGIN]: {
    [SUCCESS]: (state, { user: profile }) => profile,
    [FAILURE]: () => initialState.profile,
  },
});

const token = createReducer(initialState.token, {
  [LOGIN]: {
    [SUCCESS]: (state, { token }) => token,
    [FAILURE]: () => initialState.token,
  },
});

export default combineReducers({
  isAuthenticating,
  profile,
  token,
});

/**
 * SELECTORS
 */
export const selectUser = state => state.user;

export const selectIsAuthenticating = state => selectUser(state).isAuthenticating;
export const selectProfile = state => selectUser(state).profile;
export const selectToken = state => selectUser(state).token;

export const selectIsLoggedIn = createSelector(
  selectToken,
  token => !!token
);

/**
 * SAGAS
 */
function* login({ payload }) {
  try {
    const resp = yield call(api.login, payload);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* relogin() {
  try {
    const resp = yield call(api.relogin);
    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

export function* userSaga() {
  yield takeLatest(createActionType(LOGIN, REQUEST), login);
  yield takeLatest(RELOGIN, relogin);
}
