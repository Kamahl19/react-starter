import { AxiosResponse } from 'axios';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionType, createAction, createAsyncAction, createReducer } from 'typesafe-actions';

import { RootState } from 'app/store';
import { User, Token, LoginPayload, AuthResponse } from 'common/ApiTypes';

import api from './api';

/**
 * ACTIONS
 */
export const loginActions = createAsyncAction(
  'user/LOGIN_REQUEST',
  'user/LOGIN_SUCCESS',
  'user/LOGIN_FAILURE'
)<LoginPayload, AuthResponse, undefined>();
export const reloginAction = createAction('user/RELOGIN')();
export const logoutAction = createAction('user/LOGOUT')();

const actions = { loginActions, reloginAction, logoutAction };
export type UserAction = ActionType<typeof actions>;

/**
 * REDUCERS
 */
type UserState = Readonly<{
  user: User | null;
  token: Token | null;
  isAuthenticating: boolean;
}>;

const initialState: UserState = {
  isAuthenticating: false,
  user: null,
  token: null,
};

const isAuthenticating = createReducer(initialState.isAuthenticating)
  .handleAction([reloginAction, loginActions.request], () => true)
  .handleAction([loginActions.success, loginActions.failure], () => false);

const user = createReducer(initialState.user)
  .handleAction(loginActions.success, (_, { payload: { user } }) => user)
  .handleAction(loginActions.failure, () => null);

const token = createReducer(initialState.token)
  .handleAction(loginActions.success, (_, { payload: { token } }) => token)
  .handleAction(loginActions.failure, () => initialState.token);

export default combineReducers({
  isAuthenticating,
  user,
  token,
});

/**
 * SELECTORS
 */
export const selectUserState = (state: RootState) => state.user;

export const selectIsAuthenticating = (state: RootState) => selectUserState(state).isAuthenticating;
export const selectUser = (state: RootState) => selectUserState(state).user;
export const selectToken = (state: RootState) => selectUserState(state).token;

export const selectIsLoggedIn = createSelector(selectToken, token => !!token);

/**
 * SAGAS
 */
function* login({ payload }: ReturnType<typeof loginActions.request>) {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.login, payload);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

function* relogin() {
  try {
    const resp: AxiosResponse<AuthResponse> = yield call(api.relogin);

    yield put(loginActions.success(resp.data));
  } catch {
    yield put(loginActions.failure());
  }
}

export function* userSaga() {
  yield takeLatest(loginActions.request, login);
  yield takeLatest(reloginAction, relogin);
}
