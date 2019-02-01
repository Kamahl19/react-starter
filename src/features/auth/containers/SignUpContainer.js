import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../packages/spinner';

import { signUpRequest } from '../ducks';
import { apiCallIds } from '../api';
import SignUp from '../components/SignUp';

const mapDispatchToProps = {
  signUp: signUpRequest,
};

const SignUpContainer = ({ isLoading, signUp }) => (
  <SignUp isLoading={isLoading} onSubmit={signUp} />
);

SignUpContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(
  connectSpinner({
    isLoading: apiCallIds.SIGN_UP,
  })(SignUpContainer)
);
