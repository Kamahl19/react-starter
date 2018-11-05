import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../common/services/spinner';
import { loginActions } from '../../../common/services/user';

import { apiCallIds } from '../api';
import Login from '../components/Login';

const EnhancedLogin = connectSpinner({
  isLoading: apiCallIds.LOGIN,
})(Login);

const mapDispatchToProps = {
  login: loginActions.request,
};

const LoginContainer = ({ login }) => <EnhancedLogin onSubmit={login} />;

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginContainer);
