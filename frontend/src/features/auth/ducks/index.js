import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import message from 'antd/lib/message';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { t } from '../../../app/i18n';
import api from '../api';
import {
  createActionCreator,
  createApiActionCreators,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
  FAILURE,
} from '../../../common/utils/reduxHelpers';

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

export const selectUserEmail = createSelector(selectUser, user => user && user.email);
export const selectIsLoggedIn = createSelector(selectUser, user => user !== null);

/**
 * SAGAS
 */
function* signUp({ payload }) {
  const resp = yield call(api.signUp, payload);

  yield call(doLogin, resp);
}

function* login({ payload }) {
  const resp = yield call(api.login, payload);

  yield call(doLogin, resp);
}

function* doLogin(resp) {
  if (resp.ok) {
    yield put(loginActions.success(resp.data));
  } else {
    yield put(loginActions.failure(resp.error));
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
    const resp = yield call(fetchMe, {
      payload: {
        userId: payload.user.id,
      },
    });

    if (resp.ok) {
      yield call(doLogin, {
        ...resp,
        data: {
          user: resp.data.user,
          token: payload.token,
        },
      });
    } else {
      yield call(doLogin, resp);
    }
  }
}

function* logoutRedirect() {
  yield put(push('/auth/login'));
}

function* forgottenPassword({ payload }) {
  const resp = yield call(api.forgottenPassword, payload.email);

  if (resp.ok) {
    message.success(
      t('An e-mail with further instructions has been sent to youe e-mail address.'),
      3
    );

    yield put(push('/'));
  }
}

function* resetPassword({ payload }) {
  const resp = yield call(api.resetPassword, payload);

  yield call(doLogin, resp);
}

function* locationChanged({ payload }) {
  const activatePath = '/auth/activate';

  if (payload.pathname.includes(activatePath)) {
    const exclude = activatePath.split('/');
    const [userId, activationToken] = payload.pathname
      .split('/')
      .filter(part => !exclude.includes(part));

    yield call(activateUser, userId, activationToken);
  }
}

function* activateUser(userId, activationToken) {
  const resp = yield call(api.activateUser, {
    userId,
    activationToken,
  });

  if (resp.ok) {
    message.success(t('Your account has been activated successfully'), 3);

    yield call(doLogin, resp);
  }

  yield put(push('/'));
}

export function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
  yield takeLatest(createActionType(LOGIN, REQUEST), login);
  yield takeLatest(RELOGIN, refetchMe);
  yield takeLatest(LOGOUT, logoutRedirect);
  yield takeLatest(FORGOTTEN_PASSWORD, forgottenPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
  yield takeEvery('@@router/LOCATION_CHANGE', locationChanged);
}
