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

import { RootState } from 'app/store';

import api from './api';

/**
 * MODEL
 */
type Credentials = {
  password: string;
  email: string;
};

type Profile = {
  id: string;
  email: string;
};

type LoginResponse = {
  user: Profile;
  token: string;
};

type UserState = Readonly<{
  profile: Profile | null;
  token: string | null;
  isAuthenticating: boolean;
}>;

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
  profile: null,
  token: null,
};

const isAuthenticating = createReducer(initialState.isAuthenticating)
  .handleAction([reloginAction, loginActions.request], () => true)
  .handleAction([loginActions.success, loginActions.failure], () => false);

const profile = createReducer(initialState.profile)
  .handleAction(loginActions.success, (_, { payload: { user } }) => user)
  .handleAction(loginActions.failure, () => null);

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
export const selectUser = (state: RootState) => state.user;

export const selectIsAuthenticating = (state: RootState) => selectUser(state).isAuthenticating;
export const selectProfile = (state: RootState) => selectUser(state).profile;
export const selectToken = (state: RootState) => selectUser(state).token;

export const selectIsLoggedIn = createSelector(
  selectToken,
  token => !!token
);

/**
 * SAGAS
 */
function* login({ payload }: ReturnType<typeof loginActions.request>) {
  try {
    const resp: AxiosResponse<LoginResponse> = yield call(
      api.login,
      payload.email,
      payload.password
    );

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
  yield takeLatest(loginActions.request, login);
  yield takeLatest(reloginAction, relogin);
}
