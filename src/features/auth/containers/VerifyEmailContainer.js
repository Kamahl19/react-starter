import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../common/services/spinner';

import {
  verifyEmailAction,
  resendEmailVerificationAction,
  selectEmailCredentialExists,
} from '../ducks';
import { apiCallIds } from '../api';
import VerifyEmail from '../components/VerifyEmail';

const EnhancedVerifyEmail = connectSpinner({
  isLoading: apiCallIds.VERIFY_EMAIL,
  isResendEmailVerificationLoading: apiCallIds.RESEND_EMAIL_VERIFICATION,
})(VerifyEmail);

const mapStateToProps = state => ({
  emailCredentialExists: selectEmailCredentialExists(state),
});

const mapDispatchToProps = {
  verifyEmail: verifyEmailAction,
  resendEmailVerification: resendEmailVerificationAction,
};

const VerifyEmailContainer = ({ resendEmailVerification, verifyEmail, emailCredentialExists }) => (
  <EnhancedVerifyEmail
    emailCredentialExists={emailCredentialExists}
    onSubmit={verifyEmail}
    onResendEmailVerification={resendEmailVerification}
  />
);

VerifyEmailContainer.propTypes = {
  emailCredentialExists: PropTypes.bool.isRequired,
  resendEmailVerification: PropTypes.func.isRequired,
  verifyEmail: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyEmailContainer);
