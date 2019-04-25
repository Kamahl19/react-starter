import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useSpinner } from 'packages/spinner';

import { resetPasswordRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import ResetPassword from './view';

const mapDispatchToProps = {
  resetPassword: resetPasswordRequest,
};

const ResetPasswordContainer = ({
  match: {
    params: { passwordResetToken },
  },
  resetPassword,
}) => {
  const isLoading = useSpinner(apiCallIds.RESET_PASSWORD);

  return (
    <ResetPassword
      isLoading={isLoading}
      onSubmit={data => resetPassword({ ...data, passwordResetToken })}
    />
  );
};

ResetPasswordContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      passwordResetToken: PropTypes.string.isRequired,
    }),
  }),
  resetPassword: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(ResetPasswordContainer);
