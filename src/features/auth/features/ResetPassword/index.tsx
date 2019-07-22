import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { InjectedAuthReduxProps } from 'redux-auth-wrapper/history4/redirect';

import { useSpinner } from 'packages/spinner';

import { resetPasswordAction } from '../../ducks';
import { apiCallIds } from '../../api';

import ResetPassword from './view';

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
};

type Props = InjectedAuthReduxProps &
  RouteComponentProps<{
    passwordResetToken: string;
  }> &
  typeof mapDispatchToProps;

const ResetPasswordContainer = ({ match, resetPassword }: Props) => {
  const isLoading = useSpinner(apiCallIds.RESET_PASSWORD);

  return (
    <ResetPassword
      isLoading={isLoading}
      onSubmit={values =>
        resetPassword({ ...values, passwordResetToken: match.params.passwordResetToken })
      }
    />
  );
};

export default connect(
  undefined,
  mapDispatchToProps
)(ResetPasswordContainer);
