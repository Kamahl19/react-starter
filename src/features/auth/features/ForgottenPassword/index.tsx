import React from 'react';
import { connect } from 'react-redux';

import { useSpinner } from 'packages/spinner';

import { forgottenPasswordRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import ForgottenPassword from './view';

const mapDispatchToProps = {
  forgottenPassword: forgottenPasswordRequest,
};

type Props = {
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
