import { useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useTrackProgress } from 'common/services/trackProgress';

import { resetPasswordAction } from '../../ducks';
import { apiCallIds } from '../../api';
import { ResetPasswordParams } from '../../routes';
import ResetPassword from './view';

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
};

type Props = typeof mapDispatchToProps;

const ResetPasswordContainer = ({ resetPassword }: Props) => {
  const { passwordResetToken } = useParams<ResetPasswordParams>();
  const isInProgress = useTrackProgress(apiCallIds.RESET_PASSWORD);

  const onSubmit = useCallback((values) => resetPassword({ ...values, passwordResetToken }), [
    resetPassword,
    passwordResetToken,
  ]);

  return <ResetPassword isLoading={isInProgress} onSubmit={onSubmit} />;
};

export default connect(null, mapDispatchToProps)(ResetPasswordContainer);
