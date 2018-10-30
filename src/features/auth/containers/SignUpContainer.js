import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../common/services/spinner';

import { signUpRequest } from '../ducks';
import { apiCallIds } from '../api';
import SignUp from '../components/SignUp';

const EnhancedSignUp = connectSpinner({
  isLoading: apiCallIds.SIGN_UP,
})(SignUp);

const mapDispatchToProps = {
  signUp: signUpRequest,
};

const SignUpContainer = ({ signUp }) => <EnhancedSignUp onSubmit={signUp} />;

SignUpContainer.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(SignUpContainer)
);
