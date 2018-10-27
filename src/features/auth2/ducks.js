import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, fork, take, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Auth } from 'aws-amplify';
import i18next from 'i18next';

import {
  LOGIN,
  LOGOUT,
  loginActions,
  relogin,
  fetchProfile,
  acceptTerms,
} from '../../common/services/user';
import { t } from '../../common/services/i18n';
import { AMPLIFY_ERROR_CODES, AMPLIFY_CHALLENGE_TYPES } from '../../common/enums';
import AlertService from '../../common/services/alert';
import { handleAmplifyError } from '../../common/services/amplify';
import { startApiCall, finishApiCall, withApiCall } from '../../common/services/spinner';
import {
  createActionCreator,
  createReducer,
  createActionType,
  REQUEST,
  SUCCESS,
} from '../../common/utils/reduxHelpers';

import { apiCallIds } from './api';

/**
 * ACTION TYPES
 */
export const CONFIRM_LOGIN = 'auth/CONFIRM_LOGIN';
export const STORE_CREDENTIALS = 'auth/STORE_CREDENTIALS';
export const SIGN_UP = 'auth/SIGN_UP';
export const VERIFY_EMAIL = 'auth/VERIFY_EMAIL';
export const RESEND_EMAIL_VERIFICATION = 'auth/RESEND_EMAIL_VERIFICATION';
export const FORGOTTEN_PASSWORD = 'auth/FORGOTTEN_PASSWORD';
export const RESET_PASSWORD = 'auth/RESET_PASSWORD';

/**
 * ACTIONS
 */
export const confirmLoginAction = createActionCreator(CONFIRM_LOGIN);
export const storeCredentialsAction = createActionCreator(STORE_CREDENTIALS);
export const signUpAction = createActionCreator(SIGN_UP);
export const verifyEmailAction = createActionCreator(VERIFY_EMAIL);
export const resendEmailVerificationAction = createActionCreator(RESEND_EMAIL_VERIFICATION);
export const forgottenPasswordAction = createActionCreator(FORGOTTEN_PASSWORD);
export const resetPasswordAction = createActionCreator(RESET_PASSWORD);

/**
 * REDUCERS
 */
const initialState = {
  credentials: null,
  isLoggingOut: false,
};

const credentials = createReducer(initialState.credentials, {
  [STORE_CREDENTIALS]: (state, payload) => payload,
  [LOGIN]: {
    [SUCCESS]: (state, payload) => initialState.credentials,
  },
});

const isLoggingOut = createReducer(initialState.isLoggingOut, {
  [LOGOUT]: (state, payload) => true,
});

export default combineReducers({
  credentials,
  isLoggingOut,
});

/**
 * SELECTORS
 */
export const selectAuth = state => state.auth;

export const selectCredentials = state => selectAuth(state).credentials || {};
export const selectIsLoggingOut = state => selectAuth(state).isLoggingOut;

export const selectEmailCredentialExists = createSelector(
  selectCredentials,
  credentials => !!credentials.email
);

/**
 * SAGAS
 */
export const login = withApiCall(apiCallIds.LOGIN, function*({ payload }) {
  const { email, password } = payload;

  try {
    const user = yield call([Auth, Auth.signIn], email, password);

    if (user.challengeName === AMPLIFY_CHALLENGE_TYPES.SOFTWARE_TOKEN_MFA) {
      yield put(push('/auth/confirm-login'));
      yield call(confirmLogin, user);
    } else {
      yield call(fetchProfile);
      yield put(loginActions.success());
    }
  } catch (error) {
    if (error.code === AMPLIFY_ERROR_CODES.NOT_CONFIRMED) {
      AlertService.success(
        t('notification.verifyEmail', {
          defaultValue: 'Please verify your e-mail before logging in.',
        })
      );

      yield put(storeCredentialsAction({ email, password }));
      yield put(push('/auth/verify-email'));
    } else {
      handleAmplifyError(error);
    }
  }
});

export function* confirmLogin(user) {
  const { payload } = yield take(CONFIRM_LOGIN);
  yield put(startApiCall({ apiCallId: apiCallIds.CONFIRM_LOGIN }));
  yield call(
    [Auth, Auth.confirmSignIn],
    user,
    payload.code,
    AMPLIFY_CHALLENGE_TYPES.SOFTWARE_TOKEN_MFA
  );
  yield call(relogin);
  yield put(finishApiCall({ apiCallId: apiCallIds.CONFIRM_LOGIN }));
}

export const signUp = withApiCall(apiCallIds.SIGN_UP, function*({ payload }) {
  const { email, password } = payload;

  try {
    const resp = yield call([Auth, Auth.signUp], {
      username: email,
      password,
      attributes: {
        locale: i18next.language,
      },
    });

    yield fork(acceptTerms, resp.userSub);

    if (resp.userConfirmed) {
      yield put(loginActions.request({ email, password }));
    } else {
      yield put(storeCredentialsAction({ email, password }));
      yield put(push('/auth/verify-email'));
    }
  } catch (error) {
    handleAmplifyError(error);
  }
});

export const verifyEmail = withApiCall(apiCallIds.VERIFY_EMAIL, function*({ payload }) {
  const { email = payload.email, password } = yield select(selectCredentials);

  try {
    yield call([Auth, Auth.confirmSignUp], email, payload.code);

    if (password) {
      AlertService.success(
        t('notification.verification.password', {
          defaultValue: 'An e-mail has been verified. You will be logged-in now.',
        })
      );
      yield put(loginActions.request({ email, password }));
    } else {
      AlertService.success(
        t('notification.verification.noPassword', {
          defaultValue: 'An e-mail has been verified. You can log-in now.',
        })
      );
      yield put(push('/auth/login'));
    }
  } catch (error) {
    handleAmplifyError(error);
  }
});

export const resendEmailVerification = withApiCall(apiCallIds.RESEND_EMAIL_VERIFICATION, function*({
  payload,
}) {
  const { email = payload.email } = yield select(selectCredentials);

  try {
    yield call([Auth, Auth.resendSignUp], email);

    AlertService.success(
      t('notification.emailVerification', {
        defaultValue: 'A new verification code has been sent to your e-mail.',
      })
    );
  } catch (error) {
    handleAmplifyError(error);
  }
});

export const forgottenPassword = withApiCall(apiCallIds.FORGOTTEN_PASSWORD, function*({ payload }) {
  const { email } = payload;

  try {
    yield call([Auth, Auth.forgotPassword], email);

    AlertService.success(
      t('notification.forgottenPassword', {
        defaultValue: 'An e-mail with further instructions has been sent to your e-mail address.',
      })
    );

    yield put(storeCredentialsAction({ email }));

    yield put(push('/auth/reset-password'));
  } catch (error) {
    handleAmplifyError(error);
  }
});

export const resetPassword = withApiCall(apiCallIds.RESET_PASSWORD, function*({ payload }) {
  const { code, password } = payload;
  const { email = payload.email } = yield select(selectCredentials);

  try {
    yield call([Auth, Auth.forgotPasswordSubmit], email, code, password);

    AlertService.success(
      t('notification.passwordReset', {
        defaultValue: 'Password has been changed. You will be logged-in now.',
      })
    );

    yield put(loginActions.request({ email, password }));
  } catch (error) {
    handleAmplifyError(error);
  }
});

function* logout() {
  try {
    yield call([Auth, Auth.signOut]);
  } catch (error) {
    handleAmplifyError(error);
  }
}

export function* authSaga() {
  yield takeLatest(createActionType(LOGIN, REQUEST), login);
  yield takeLatest(LOGOUT, logout);
  yield takeLatest(SIGN_UP, signUp);
  yield takeLatest(VERIFY_EMAIL, verifyEmail);
  yield takeLatest(RESEND_EMAIL_VERIFICATION, resendEmailVerification);
  yield takeLatest(FORGOTTEN_PASSWORD, forgottenPassword);
  yield takeLatest(RESET_PASSWORD, resetPassword);
}
