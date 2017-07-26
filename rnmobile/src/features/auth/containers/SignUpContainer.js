import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUpRequest } from '../ducks';
import { SignUp } from '../components';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signUp: signUpRequest }, dispatch),
});

const SignUpContainer = ({ actions }) => <SignUp onSubmit={actions.signUp} />;

SignUpContainer.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default connect(undefined, mapDispatchToProps)(SignUpContainer);
