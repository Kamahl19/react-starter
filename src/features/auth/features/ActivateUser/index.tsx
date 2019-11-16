import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { activateUserAction, ActivateUserPayload } from '../../ducks';

const mapDispatchToProps = {
  activateUser: activateUserAction,
};

type Props = typeof mapDispatchToProps;

const ActivateUserContainer = ({ activateUser }: Props) => {
  const { userId, activationToken } = useParams();

  useEffect(() => {
    activateUser({ userId, activationToken } as ActivateUserPayload);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default connect(null, mapDispatchToProps)(ActivateUserContainer);
