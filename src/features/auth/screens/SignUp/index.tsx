import { connect } from 'react-redux';

import { useTrackProgress } from 'common/services/trackProgress';

import { signUpAction } from '../../ducks';
import { apiCallIds } from '../../api';
import SignUp from './view';

const mapDispatchToProps = {
  signUp: signUpAction,
};

type Props = typeof mapDispatchToProps;

const SignUpContainer = ({ signUp }: Props) => {
  const isInProgress = useTrackProgress(apiCallIds.SIGN_UP);

  return <SignUp isLoading={isInProgress} onSubmit={signUp} />;
};

export default connect(null, mapDispatchToProps)(SignUpContainer);
