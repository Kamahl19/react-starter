import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spin from 'antd/lib/spin';
import { selectIsAuthenticating, signUpRequest } from '../ducks';
import { SignUpForm } from '../components';

const mapStateToProps = state => ({
  isAuthenticating: selectIsAuthenticating(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signUp: signUpRequest }, dispatch),
});

const SignUpContainer = ({ isAuthenticating, actions }) =>
  <Spin spinning={isAuthenticating}>
    <SignUpForm onSubmit={actions.signUp} />
  </Spin>;

SignUpContainer.propTypes = {
  isAuthenticating: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
