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
  const { userId, token } = useParams<ActivateAccountParams>();

  useEffect(() => {
    activateAccount({ userId, token });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default connect(null, mapDispatchToProps)(ActivateAccountContainer);
