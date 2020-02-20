import { useEffect } from 'react';
import { connect } from 'react-redux';

import { logoutAction } from 'common/services/auth';

const mapDispatchToProps = {
  logout: logoutAction,
};

type Props = typeof mapDispatchToProps;

const LogoutContainer = ({ logout }: Props) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

export default connect(null, mapDispatchToProps)(LogoutContainer);
