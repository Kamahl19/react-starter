import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import { activateAccountAction } from '../../ducks';
import { ActivateAccountParams } from '../../routes';

const mapDispatchToProps = {
  activateAccount: activateAccountAction,
};

type Props = typeof mapDispatchToProps;

const ActivateAccountContainer = ({ activateAccount }: Props) => {
  const { userId, activationToken } = useParams<ActivateAccountParams>();

  useEffect(() => {
    activateAccount({ userId, activationToken });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default connect(null, mapDispatchToProps)(ActivateAccountContainer);
