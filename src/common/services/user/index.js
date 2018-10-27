import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  createActionCreator,
  createApiActionCreators,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../../utils/reduxHelpers';

import api from './api';

/**
 * ACTION TYPES
 */
export const RELOGIN = 'user/RELOGIN';
export const LOGIN = 'user/LOGIN';
export const LOGOUT = 'user/LOGOUT';

/**
 * ACTIONS
 */
export const reloginAction = createActionCreator(RELOGIN);
export const loginActions = createApiActionCreators(LOGIN);
export const logoutAction = createActionCreator(LOGOUT);

/**
 * REDUCERS
 */
const initialState = {
  profile: null,
  token: null,
  isAuthenticating: false,
};

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

const isAuthenticating = createReducer(initialState.isAuthenticating, {
  [RELOGIN]: () => true,
  [LOGIN]: {
    [REQUEST]: () => true,
    [SUCCESS]: () => false,
    [FAILURE]: () => false,
  },
});

export default combineReducers({
  profile,
  token,
  isAuthenticating,
});

/**
 * SELECTORS
 */
export const selectUser = state => state.user;

export const selectProfile = state => selectUser(state).profile;
export const selectToken = state => selectUser(state).token;
export const selectIsAuthenticating = state => selectUser(state).isAuthenticating;

export const selectIsLoggedIn = createSelector(selectToken, token => !!token);

/**
 * SAGAS
 */
function* login({ payload }) {
  const resp = yield call(api.login, payload);

  if (resp.ok) {
    yield put(loginActions.success(resp.data));
  } else {
    yield put(loginActions.failure());
  }
}

function* relogin() {
  const resp = yield call(api.relogin);

  if (resp.ok) {
    yield put(loginActions.success(resp.data));
  } else {
    yield put(loginActions.failure());
  }
}

function* logout() {
  yield put(push('/auth/login'));
}

export function* userSaga() {
  yield takeLatest(createActionType(LOGIN, REQUEST), login);
  yield takeLatest(RELOGIN, relogin);
  yield takeLatest(LOGOUT, logout);
}
