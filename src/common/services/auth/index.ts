import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { ActionType, createAction, createAsyncAction, createReducer } from 'typesafe-actions';

import { RootState } from 'app/store';
import { User, Token, LoginPayload, AuthResponse } from 'common/ApiTypes';

/**
 * ACTIONS
 */
export const loginActions = createAsyncAction(
  'authService/LOGIN_REQUEST',
  'authService/LOGIN_SUCCESS',
  'authService/LOGIN_FAILURE'
)<LoginPayload, AuthResponse, undefined>();
export const reloginAction = createAction('authService/RELOGIN')();
export const logoutAction = createAction('authService/LOGOUT')();

const actions = { loginActions, reloginAction, logoutAction };
export type AuthServiceAction = ActionType<typeof actions>;

/**
 * REDUCERS
 */
type AuthServiceState = Readonly<{
  user: User | null;
  token: Token | null;
  isAuthenticating: boolean;
}>;

const initialState: AuthServiceState = {
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

export const authServiceReducer = combineReducers({
  isAuthenticating,
  user,
  token,
});

/**
 * SELECTORS
 */
export const selectAuthServiceState = (state: RootState) => state.authService;

export const selectIsAuthenticating = (state: RootState) =>
  selectAuthServiceState(state).isAuthenticating;
export const selectUser = (state: RootState) => selectAuthServiceState(state).user;
export const selectToken = (state: RootState) => selectAuthServiceState(state).token;

export const selectIsLoggedIn = createSelector(selectToken, (token) => !!token);
