import React from 'react';
import { connect } from 'react-redux';
import { InjectedAuthReduxProps } from 'redux-auth-wrapper/history4/redirect'; // TODO remove

import { useSpinner } from 'packages/spinner';

import { forgottenPasswordRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import ForgottenPassword from './view';

const mapDispatchToProps = {
  forgottenPassword: forgottenPasswordRequest,
};

type Props = InjectedAuthReduxProps & {
  forgottenPassword: (...args: any[]) => any; // TODO
};

const ForgottenPasswordContainer = ({ forgottenPassword }: Props) => {
  const isLoading = useSpinner(apiCallIds.FORGOTTEN_PASSWORD);

  return <ForgottenPassword isLoading={isLoading} onSubmit={forgottenPassword} />;
};

export default connect(
  undefined,
  mapDispatchToProps
)(ForgottenPasswordContainer);
