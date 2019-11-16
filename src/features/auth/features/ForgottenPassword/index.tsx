import React from 'react';
import { connect } from 'react-redux';

import { useSpinner } from 'packages/spinner';

import { forgottenPasswordAction } from '../../ducks';
import { apiCallIds } from '../../api';

import ForgottenPassword from './view';

const mapDispatchToProps = {
  forgottenPassword: forgottenPasswordAction,
};

type Props = typeof mapDispatchToProps;

const ForgottenPasswordContainer = ({ forgottenPassword }: Props) => {
  const isLoading = useSpinner(apiCallIds.FORGOTTEN_PASSWORD);

  return <ForgottenPassword isLoading={isLoading} onSubmit={forgottenPassword} />;
};

export default connect(null, mapDispatchToProps)(ForgottenPasswordContainer);
