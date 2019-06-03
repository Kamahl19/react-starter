import { useEffect } from 'react';
import { connect } from 'react-redux';

import { logoutAction } from 'common/services/user';

const mapDispatchToProps = {
  logout: logoutAction,
};

type Props = {
  logout: (...args: any[]) => any; // TODO
};

const LogoutContainer = ({ logout }: Props) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return null;
};

export default connect(
  undefined,
  mapDispatchToProps
)(LogoutContainer);
