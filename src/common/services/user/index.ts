import { AxiosResponse } from 'axios';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ActionType,
  createStandardAction,
  createAsyncAction,
  createReducer,
} from 'typesafe-actions';

import { AppState } from '../../../app/store';

import api from './api';

/**
 * MODEL
 */
type Credentials = {
  password: string;
  email: string;
};

type Profile = {
  id: number;
  // TODO add fields
};

type LoginResponse = {
  user: Profile;
  token: string;
};

type UserState = {
  profile?: Profile;
  token?: string;
  isAuthenticating: boolean;
};

/**
 * ACTIONS
 */
export const loginActions = createAsyncAction(
  'user/LOGIN_REQUEST',
  'user/LOGIN_SUCCESS',
  'user/LOGIN_FAILURE'
)<Credentials, LoginResponse, undefined>();
export const reloginAction = createStandardAction('user/RELOGIN')();
export const logoutAction = createStandardAction('user/LOGOUT')();

const actions = { loginActions, reloginAction, logoutAction };
export type UserAction = ActionType<typeof actions>;

/**
 * REDUCERS
 */
const initialState: UserState = {
  isAuthenticating: false,
  profile: undefined,
  token: undefined,
};

const isAuthenticating = createReducer(initialState.isAuthenticating)
  .handleAction(reloginAction, () => true)
  .handleAction(loginActions.request, () => true)
  .handleAction(loginActions.success, () => false)
  .handleAction(loginActions.failure, () => false);

const profile = createReducer(initialState.profile)
  .handleAction(loginActions.success, (_, { payload: { user } }) => user)
  .handleAction(loginActions.failure, () => undefined);

const token = createReducer(initialState.token)
  .handleAction(loginActions.success, (_, { payload: { token } }) => token)
  .handleAction(loginActions.failure, () => initialState.token);

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
const login = takeLatest(loginActions.request, function*({ payload }) {
  try {
    const resp: AxiosResponse<LoginResponse> = yield call(api.login, payload);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
});

const relogin = takeLatest(reloginAction, function*() {
  try {
    const resp = yield call(api.relogin);
    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
});

export function* userSaga() {
  yield login;
  yield relogin;
}
