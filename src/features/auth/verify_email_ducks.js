import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Auth } from 'aws-amplify';

import { LOGIN, loginActions } from '../../common/services/user';
import { t } from '../../common/services/i18n';
import AlertService from '../../common/services/alert';
import { handleAmplifyError } from '../../common/services/amplify';
import { withApiCall } from '../../common/services/spinner';
import { createActionCreator, createReducer, SUCCESS } from '../../common/utils/reduxHelpers';

import { apiCallIds } from './api';

/**
 * ACTION TYPES
 */
export const STORE_CREDENTIALS = 'auth/STORE_CREDENTIALS';
export const VERIFY_EMAIL = 'auth/VERIFY_EMAIL';
export const RESEND_EMAIL_VERIFICATION = 'auth/RESEND_EMAIL_VERIFICATION';

/**
 * ACTIONS
 */
export const storeCredentialsAction = createActionCreator(STORE_CREDENTIALS);
export const verifyEmailAction = createActionCreator(VERIFY_EMAIL);
export const resendEmailVerificationAction = createActionCreator(RESEND_EMAIL_VERIFICATION);

/**
 * REDUCERS
 */
const initialState = {
  credentials: null,
};

const credentials = createReducer(initialState.credentials, {
  [STORE_CREDENTIALS]: (state, payload) => payload,
  [LOGIN]: {
    [SUCCESS]: (state, payload) => initialState.credentials,
  },
});

export default combineReducers({
  credentials,
});

/**
 * SELECTORS
 */
export const selectAuth = state => state.auth;

export const selectCredentials = state => selectAuth(state).credentials || {};

export const selectEmailCredentialExists = createSelector(
  selectCredentials,
  credentials => !!credentials.email
);

/**
 * SAGAS
 */

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

export function* authSaga() {
  yield takeLatest(VERIFY_EMAIL, verifyEmail);
  yield takeLatest(RESEND_EMAIL_VERIFICATION, resendEmailVerification);
}
