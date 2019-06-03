import React from 'react';
import { connect } from 'react-redux';

import { useSpinner } from 'packages/spinner';

import { signUpRequest } from '../../ducks';
import { apiCallIds } from '../../api';

import SignUp from './view';

const mapDispatchToProps = {
  signUp: signUpRequest,
};

type Props = {
  signUp: (...args: any[]) => any; // TODO
};

const SignUpContainer = ({ signUp }: Props) => {
  const isLoading = useSpinner(apiCallIds.SIGN_UP);

  return <SignUp isLoading={isLoading} onSubmit={signUp} />;
};

export default connect(
  undefined,
  mapDispatchToProps
)(SignUpContainer);
