import React from 'react';
import { connect } from 'react-redux';

import { useSpinner } from 'packages/spinner';

import { loginActions } from 'common/services/user';
import { apiCallIds } from 'common/services/user/api';

import Login from './view';

const mapDispatchToProps = {
  login: loginActions.request,
};

type Props = {
  login: (...args: any[]) => any; // TODO
};

const LoginContainer = ({ login }: Props) => {
  const isLoading = useSpinner(apiCallIds.LOGIN);

  return <Login isLoading={isLoading} onSubmit={login} />;
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginContainer);
