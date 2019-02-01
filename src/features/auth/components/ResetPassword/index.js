import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../../packages/spinner';
import { resetPasswordRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import ResetPassword from './component';

const mapDispatchToProps = {
  resetPassword: resetPasswordRequest,
};

const ResetPasswordContainer = ({
  isLoading,
  match: {
    params: { passwordResetToken },
  },
  resetPassword,
}) => (
  <ResetPassword
    isLoading={isLoading}
    onSubmit={data => resetPassword({ ...data, passwordResetToken })}
  />
);

ResetPasswordContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
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
)(
  connectSpinner({
    isLoading: apiCallIds.RESET_PASSWORD,
  })(ResetPasswordContainer)
);
