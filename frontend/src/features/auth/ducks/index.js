import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import message from 'antd/lib/message';
import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { t } from '@src/app/i18n';
import api from '../api';
import {
  createActionCreator,
  createApiActionCreators,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '@src/common/utils/reduxHelpers';

/**
 * ACTION TYPES
 */
export const SIGN_UP_REQUEST = 'auth/SIGN_UP_REQUEST';
export const LOGIN = 'auth/LOGIN';
export const RELOGIN = 'auth/RELOGIN';
export const FETCH_ME = 'auth/FETCH_ME';
export const LOGOUT = 'auth/LOGOUT';
export const FORGOTTEN_PASSWORD = 'auth/FORGOTTEN_PASSWORD';
export const RESET_PASSWORD = 'auth/RESET_PASSWORD';
export const ACTIVATE_USER = 'auth/ACTIVATE_USER';

/**
 * ACTIONS
 */
export const signUpRequest = createActionCreator(SIGN_UP_REQUEST);
export const loginActions = createApiActionCreators(LOGIN);
export const relogin = createActionCreator(RELOGIN);
export const fetchMeActions = createApiActionCreators(FETCH_ME);
export const logout = createActionCreator(LOGOUT);
export const forgottenPasswordRequest = createActionCreator(FORGOTTEN_PASSWORD);
export const resetPasswordRequest = createActionCreator(RESET_PASSWORD);
export const activateUserRequest = createActionCreator(ACTIVATE_USER);

/**
 * REDUCERS
 */
const initialState = {
  user: null,
  token: null,
};

const user = createReducer(initialState.user, {
  [LOGIN]: {
    [SUCCESS]: (state, payload) => payload.user,
    [FAILURE]: (state, payload) => initialState.user,
  },
  [LOGOUT]: state => initialState.user,
  [FETCH_ME]: {
    [SUCCESS]: (state, payload) => payload.user,
    [FAILURE]: state => initialState.user,
  },
});

const token = createReducer(initialState.token, {
  [LOGIN]: {
    [SUCCESS]: (state, payload) => payload.token,
    [FAILURE]: (state, payload) => initialState.token,
  },
  [LOGOUT]: state => initialState.token,
});

export default combineReducers({
  user,
  token,
});

/**
 * SELECTORS
 */
export const selectAuth = state => state.auth;

export const selectUser = state => selectAuth(state).user;
export const selectToken = state => selectAuth(state).token;

export const selectUserId = state => selectUser(state).id;
export const selectUserRole = state => selectUser(state).role;
export const selectIsActive = state => selectUser(state).isActive;
export const selectEmail = createSelector(selectUser, user => user && user.email);
export const selectIsLoggedIn = createSelector(selectUser, user => user !== null);

/**
 * SAGAS
 */
function* signUp({ payload }) {
  const resp = yield call(api.signUp, payload);

  yield doLogin(resp);
}

function* login({ payload }) {
  const resp = yield call(api.login, payload);

  yield doLogin(resp);
}

function* doLogin(resp) {
  if (resp.ok) {
    yield put(loginActions.success(resp.data));
  } else {
    yield put(loginActions.failure(resp.error));
  }
}

function* forgottenPassword(action) {
  const { email } = action.payload;
  const resp = yield call(api.forgottenPassword, email);

  if (resp.ok) {
    yield put(push('/'));
  }
}

function* resetPassword({ payload }) {
  const resp = yield call(api.resetPassword, payload);

  yield doLogin(resp);
}

function* activateUser(action) {
  const { userId, activationToken } = action.payload;

  const resp = yield call(api.activateUser, {
    userId,
    activationToken,
  });

  if (resp.ok) {
    message.success(t('Your account has been activated successfully'), 3);

    yield doLogin(resp);
  }

  yield put(push('/'));
}

function* fetchMe({ payload }) {
  const resp = yield call(api.fetchMe, payload.userId);

  if (resp.ok) {
    yield put(fetchMeActions.success(resp.data));
  } else {
    yield put(fetchMeActions.failure(resp.error));
  }

  return resp;
}

function* refetchMe({ payload }) {
  if (payload.user && payload.token) {
    const resp = yield fetchMe({
      payload: {
        userId: payload.user.id,
      },
    });

    if (resp.ok) {
      yield doLogin({
        ...resp,
        data: {
          user: resp.data.user,
          token: payload.token,
        },
      });
    } else {
      yield doLogin(resp);
    }
  }
}

function* logoutRedirect() {
  yield put(push('/auth/login'));
}

export function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(createActionType(LOGIN, REQUEST), login);
  yield takeLatest(RELOGIN, refetchMe);
  yield takeLatest(FORGOTTEN_PASSWORD, forgottenPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeLatest(ACTIVATE_USER, activateUser);
  yield takeLatest(LOGOUT, logoutRedirect);
}
