import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useSpinner } from 'packages/spinner';

import { forgottenPasswordRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import ForgottenPassword from './view';

const mapDispatchToProps = {
  forgottenPassword: forgottenPasswordRequest,
};

const ForgottenPasswordContainer = ({ forgottenPassword }) => {
  const isLoading = useSpinner(apiCallIds.FORGOTTEN_PASSWORD);

  return <ForgottenPassword isLoading={isLoading} onSubmit={forgottenPassword} />;
};

ForgottenPasswordContainer.propTypes = {
  forgottenPassword: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(ForgottenPasswordContainer);
