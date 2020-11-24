import { connect } from 'react-redux';

import { loginActions } from 'common/services/auth';
import { useTrackProgress } from 'common/services/trackProgress';

import { apiCallIds } from '../../api';
import Login from './view';

const mapDispatchToProps = {
  login: loginActions.request,
};

type Props = typeof mapDispatchToProps;

const LoginContainer = ({ login }: Props) => {
  const isInProgress = useTrackProgress(apiCallIds.LOGIN);

  return <Login isLoading={isInProgress} onSubmit={login} />;
};

export default connect(null, mapDispatchToProps)(LoginContainer);
