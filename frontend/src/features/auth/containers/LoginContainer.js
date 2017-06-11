import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spin from 'antd/lib/spin';
import { selectIsAuthenticating, loginActions } from '../ducks';
import { Login } from '../components';

const mapStateToProps = state => ({
  isAuthenticating: selectIsAuthenticating(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      login: loginActions.request,
    },
    dispatch
  ),
});

const LoginContainer = ({ isAuthenticating, actions }) =>
  <Spin spinning={isAuthenticating}>
    <Login onSubmit={actions.login} />
  </Spin>;

LoginContainer.propTypes = {
  isAuthenticating: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
