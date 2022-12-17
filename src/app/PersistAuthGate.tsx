import { type ReactNode, useEffect } from 'react';

import { useAuth } from 'common/auth';

type Props = {
  children: ReactNode;
  loading: ReactNode;
};

const PersistAuthGate = ({ children, loading }: Props) => {
  const { token, isLoggedIn, relogin, isReloginLoading } = useAuth();

  useEffect(() => {
    if (token) {
      relogin();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if ((token && !isLoggedIn) || isReloginLoading) {
    return <>{loading}</>;
  }

  return <>{children}</>;
};

export default PersistAuthGate;
