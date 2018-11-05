import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../common/services/spinner';

import { resetPasswordRequest } from '../ducks';
import { apiCallIds } from '../api';
import ResetPassword from '../components/ResetPassword';

const EnhancedResetPassword = connectSpinner({
  isLoading: apiCallIds.RESET_PASSWORD,
})(ResetPassword);

const mapDispatchToProps = {
  resetPassword: resetPasswordRequest,
};

const ResetPasswordContainer = ({ resetPassword }) => (
  <EnhancedResetPassword onSubmit={resetPassword} />
);

ResetPasswordContainer.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(ResetPasswordContainer);
