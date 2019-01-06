import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../packages/spinner';

import { resetPasswordRequest } from '../ducks';
import { apiCallIds } from '../api';
import ResetPassword from '../components/ResetPassword';

const EnhancedResetPassword = connectSpinner({
  isLoading: apiCallIds.RESET_PASSWORD,
})(ResetPassword);

const mapDispatchToProps = {
  resetPassword: resetPasswordRequest,
};

const ResetPasswordContainer = ({
  resetPassword,
  match: {
    params: { passwordResetToken },
  },
}) => <EnhancedResetPassword onSubmit={data => resetPassword({ ...data, passwordResetToken })} />;

ResetPasswordContainer.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      passwordResetToken: PropTypes.string.isRequired,
    }),
  }),
};

export default connect(
  undefined,
  mapDispatchToProps
)(ResetPasswordContainer);
