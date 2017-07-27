import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, takeLatest } from 'redux-saga/effects';
import AlertService from '../../../common/services/alert';
import {
  createActionCreator,
  createApiActionCreators,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../../../common/utils/reduxHelpers';
import api from '../api';

/**
 * ACTION TYPES
 */
export const SIGN_UP_REQUEST = 'auth/SIGN_UP_REQUEST';
export const LOGIN = 'auth/LOGIN';
export const RELOGIN = 'auth/RELOGIN';
export const FETCH_ME = 'auth/FETCH_ME';
export const LOGOUT = 'auth/LOGOUT';
export const FORGOTTEN_PASSWORD = 'auth/FORGOTTEN_PASSWORD';

/**
 * ACTIONS
 */
export const signUpRequest = createActionCreator(SIGN_UP_REQUEST);
export const loginActions = createApiActionCreators(LOGIN);
export const relogin = createActionCreator(RELOGIN);
export const fetchMeActions = createApiActionCreators(FETCH_ME);
export const logout = createActionCreator(LOGOUT);
export const forgottenPasswordRequest = createActionCreator(FORGOTTEN_PASSWORD);

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
    AlertService.success('Link to reset your password has been sent to your e-mail.');
  }
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

export function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(createActionType(LOGIN, REQUEST), login);
  yield takeLatest(RELOGIN, refetchMe);
  yield takeLatest(FORGOTTEN_PASSWORD, forgottenPassword);
}
