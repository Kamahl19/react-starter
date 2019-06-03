import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { useSpinner } from 'packages/spinner';

import { resetPasswordRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import ResetPassword from './view';

type Props = RouteComponentProps<{
  passwordResetToken: string;
}> & {
  resetPassword: (...args: any[]) => any; // TODO
};

const mapDispatchToProps = {
  resetPassword: resetPasswordRequest,
};

const ResetPasswordContainer = ({ match, resetPassword }: Props) => {
  const isLoading = useSpinner(apiCallIds.RESET_PASSWORD);

  return (
    <ResetPassword
      isLoading={isLoading}
      onSubmit={data =>
        resetPassword({ ...data, passwordResetToken: match.params.passwordResetToken })
      }
    />
  );
};

export default connect(
  undefined,
  mapDispatchToProps
)(ResetPasswordContainer);
