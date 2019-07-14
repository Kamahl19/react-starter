import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, takeLatest } from 'redux-saga/effects';

import { createActionCreator, createReducer } from 'packages/redux-helpers';

import { AppState } from '../../../app/store';

import api from './api';

type TODO = any;

// TODO

/**
 * ACTION TYPES
 */
export const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
export const RELOGIN = 'user/RELOGIN';
export const LOGOUT = 'user/LOGOUT';

/**
 * ACTIONS
 */
export const loginRequestAction = createActionCreator(LOGIN_REQUEST);
export const loginSuccessAction = createActionCreator(LOGIN_SUCCESS);
export const loginFailureAction = createActionCreator(LOGIN_FAILURE);
export const reloginAction = createActionCreator(RELOGIN);
export const logoutAction = createActionCreator(LOGOUT);

/**
 * REDUCERS
 */
const initialState = {
  isAuthenticating: false,
  profile: null,
  token: null,
};

const isAuthenticating = createReducer(initialState.isAuthenticating, {
  [RELOGIN]: () => true,
  [LOGIN_REQUEST]: () => true,
  [LOGIN_SUCCESS]: () => false,
  [LOGIN_FAILURE]: () => false,
});

const profile = createReducer(initialState.profile, {
  [LOGIN_SUCCESS]: (_: AppState, { user: profile }: TODO) => profile,
  [LOGIN_FAILURE]: () => initialState.profile,
});

const token = createReducer(initialState.token, {
  [LOGIN_SUCCESS]: (_: AppState, { token }: TODO) => token,
  [LOGIN_FAILURE]: () => initialState.token,
});

export default combineReducers({
  isAuthenticating,
  profile,
  token,
});

/**
 * SELECTORS
 */
export const selectUser = (state: AppState) => state.user;

export const selectIsAuthenticating = (state: AppState) => selectUser(state).isAuthenticating;
export const selectProfile = (state: AppState) => selectUser(state).profile;
export const selectToken = (state: AppState) => selectUser(state).token;

export const selectIsLoggedIn = createSelector(
  selectToken,
  token => !!token
);

/**
 * SAGAS
 */
function* login({ payload }: TODO) {
  try {
    const resp = yield call(api.login, payload);

    yield put(loginSuccessAction(resp.data));
  } catch {
    yield put(loginFailureAction());
  }
}

function* relogin() {
  try {
    const resp = yield call(api.relogin);
    yield put(loginSuccessAction(resp.data));
  } catch {
    yield put(loginFailureAction());
  }
}

export function* userSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
  yield takeLatest(RELOGIN, relogin);
}
