import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useSpinner } from 'packages/spinner';

import { resetPasswordAction, ResetPasswordPayload } from '../../ducks';
import { apiCallIds } from '../../api';

import ResetPassword, { Values } from './view';

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
};

type Props = typeof mapDispatchToProps;

const ResetPasswordContainer = ({ resetPassword }: Props) => {
  const { passwordResetToken } = useParams();
  const isLoading = useSpinner(apiCallIds.RESET_PASSWORD);

  const onSubmit = useCallback(
    (values: Values) => resetPassword({ ...values, passwordResetToken } as ResetPasswordPayload),
    [resetPassword, passwordResetToken]
  );

  return <ResetPassword isLoading={isLoading} onSubmit={onSubmit} />;
};

export default connect(null, mapDispatchToProps)(ResetPasswordContainer);
