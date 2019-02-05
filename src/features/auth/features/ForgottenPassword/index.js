import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../../packages/spinner';

import { forgottenPasswordRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import ForgottenPassword from './view';

const mapDispatchToProps = {
  forgottenPassword: forgottenPasswordRequest,
};

const ForgottenPasswordContainer = ({ forgottenPassword, isLoading }) => (
  <ForgottenPassword isLoading={isLoading} onSubmit={forgottenPassword} />
);

ForgottenPasswordContainer.propTypes = {
  forgottenPassword: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(
  connectSpinner({
    isLoading: apiCallIds.FORGOTTEN_PASSWORD,
  })(ForgottenPasswordContainer)
);
