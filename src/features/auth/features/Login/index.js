import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useSpinner } from '../../../../packages/spinner';

import { loginActions } from '../../../../common/services/user';
import { apiCallIds } from '../../../../common/services/user/api';

import Login from './view';

const mapDispatchToProps = {
  login: loginActions.request,
};

const LoginContainer = ({ login }) => {
  const isLoading = useSpinner(apiCallIds.LOGIN);

  return <Login isLoading={isLoading} onSubmit={login} />;
};

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginContainer);
