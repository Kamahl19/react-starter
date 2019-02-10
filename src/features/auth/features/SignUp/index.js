import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useSpinner } from '../../../../packages/spinner';

import { signUpRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import SignUp from './view';

const mapDispatchToProps = {
  signUp: signUpRequest,
};

const SignUpContainer = ({ signUp }) => {
  const isLoading = useSpinner(apiCallIds.SIGN_UP);

  return <SignUp isLoading={isLoading} onSubmit={signUp} />;
};

SignUpContainer.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(SignUpContainer);
