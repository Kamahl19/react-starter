import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ResetPasswordPayload } from 'common/ApiTypes';
import { useTrackProgress } from 'common/services/trackProgress';

import { resetPasswordAction } from '../../ducks';
import { apiCallIds } from '../../api';

import ResetPassword from './view';

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
};

type Props = typeof mapDispatchToProps;

const ResetPasswordContainer = ({ resetPassword }: Props) => {
  const { passwordResetToken } = useParams();
  const isInProgress = useTrackProgress(apiCallIds.RESET_PASSWORD);

  const onSubmit = useCallback(
    (values: ResetPasswordPayload) =>
      resetPassword({ ...values, passwordResetToken } as ResetPasswordPayload),
    [resetPassword, passwordResetToken]
  );

  return <ResetPassword isLoading={isInProgress} onSubmit={onSubmit} />;
};

export default connect(null, mapDispatchToProps)(ResetPasswordContainer);
