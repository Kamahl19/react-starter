import { connect } from 'react-redux';

import { useTrackProgress } from 'common/services/trackProgress';

import { forgottenPasswordAction } from '../../ducks';
import { apiCallIds } from '../../api';
import ForgottenPassword from './view';

const mapDispatchToProps = {
  forgottenPassword: forgottenPasswordAction,
};

type Props = typeof mapDispatchToProps;

const ForgottenPasswordContainer = ({ forgottenPassword }: Props) => {
  const isInProgress = useTrackProgress(apiCallIds.FORGOTTEN_PASSWORD);

  return <ForgottenPassword isLoading={isInProgress} onSubmit={forgottenPassword} />;
};

export default connect(null, mapDispatchToProps)(ForgottenPasswordContainer);
