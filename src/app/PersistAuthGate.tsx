import { type ReactNode, useEffect } from 'react';

import { useAuth } from 'common/auth';

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

const PersistAuthGate = ({ children, fallback }: Props) => {
  const { token, isLoggedIn, relogin, isReloginLoading } = useAuth();

  useEffect(() => {
    if (token) {
      relogin();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if ((token && !isLoggedIn) || isReloginLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default PersistAuthGate;
