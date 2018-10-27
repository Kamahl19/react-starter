import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../common/services/spinner';

import { resetPasswordAction, selectEmailCredentialExists } from '../ducks';
import { apiCallIds } from '../api';
import ResetPassword from '../components/ResetPassword';

const EnhancedResetPassword = connectSpinner({
  isLoading: apiCallIds.RESET_PASSWORD,
})(ResetPassword);

const mapStateToProps = state => ({
  emailCredentialExists: selectEmailCredentialExists(state),
});

const mapDispatchToProps = {
  resetPassword: resetPasswordAction,
};

const ResetPasswordContainer = ({ resetPassword, emailCredentialExists }) => (
  <EnhancedResetPassword emailCredentialExists={emailCredentialExists} onSubmit={resetPassword} />
);

ResetPasswordContainer.propTypes = {
  emailCredentialExists: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordContainer);
