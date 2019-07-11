import { useEffect } from 'react';
import { connect } from 'react-redux';
import { InjectedAuthReduxProps } from 'redux-auth-wrapper/history4/redirect';

import { logoutAction } from 'common/services/user';

const mapDispatchToProps = {
  logout: logoutAction,
};

type Props = InjectedAuthReduxProps & {
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
