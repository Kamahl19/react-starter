import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSpinner } from '../../../../packages/spinner';
import { loginActions } from '../../../../common/services/user';
import { apiCallIds } from '../../api';

import Login from './component';

const mapDispatchToProps = {
  login: loginActions.request,
};

const LoginContainer = ({ isLoading, login }) => <Login isLoading={isLoading} onSubmit={login} />;

LoginContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(
  connectSpinner({
    isLoading: apiCallIds.LOGIN,
  })(LoginContainer)
);
