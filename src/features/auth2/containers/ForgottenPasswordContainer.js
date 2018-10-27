import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../common/services/spinner';

import { forgottenPasswordAction } from '../ducks';
import { apiCallIds } from '../api';
import ForgottenPassword from '../components/ForgottenPassword';

const EnhancedForgottenPassword = connectSpinner({
  isLoading: apiCallIds.FORGOTTEN_PASSWORD,
})(ForgottenPassword);

const mapDispatchToProps = {
  forgottenPassword: forgottenPasswordAction,
};

const ForgottenPasswordContainer = ({ forgottenPassword }) => (
  <EnhancedForgottenPassword onSubmit={forgottenPassword} />
);

ForgottenPasswordContainer.propTypes = {
  forgottenPassword: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(ForgottenPasswordContainer);
