import React from 'react';
import { connect } from 'react-redux';
import { InjectedAuthReduxProps } from 'redux-auth-wrapper/history4/redirect';

import { useSpinner } from 'packages/spinner';

import { loginActions } from 'common/services/user';
import { apiCallIds } from 'common/services/user/api';

import Login from './view';

const mapDispatchToProps = {
  login: loginActions.request,
};

type Props = InjectedAuthReduxProps & {
  login: typeof loginActions.request;
};

const LoginContainer = ({ login }: Props) => {
  const isLoading = useSpinner(apiCallIds.LOGIN);

  return <Login isLoading={isLoading} onSubmit={login} />;
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginContainer);
