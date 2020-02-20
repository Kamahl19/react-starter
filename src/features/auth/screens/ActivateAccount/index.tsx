import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ActivateAccountPayload } from 'common/ApiTypes';

import { activateAccountAction } from '../../ducks';

const mapDispatchToProps = {
  activateAccount: activateAccountAction,
};

type Props = typeof mapDispatchToProps;

const ActivateAccountContainer = ({ activateAccount }: Props) => {
  const { userId, activationToken } = useParams();

  useEffect(() => {
    activateAccount({ userId, activationToken } as ActivateAccountPayload);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default connect(null, mapDispatchToProps)(ActivateAccountContainer);
