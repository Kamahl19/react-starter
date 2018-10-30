import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spin from 'antd/lib/spin';

import { selectIsInProgress } from '../../../features/spinner/ducks';

import { apiCallIds } from '../api';
import { signUpRequest } from '../ducks';
import SignUp from '../components/SignUp';

const mapStateToProps = state => ({
  isLoading: selectIsInProgress(state, apiCallIds.SIGN_UP),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ signUp: signUpRequest }, dispatch),
});

const SignUpContainer = ({ actions, isLoading }) => (
  <Spin spinning={isLoading}>
    <SignUp onSubmit={actions.signUp} />
  </Spin>
);

SignUpContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
