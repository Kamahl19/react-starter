import { type ReactNode, useEffect } from 'react';

import { useAuth, useRelogin } from 'common/auth';

type Props = {
  children: ReactNode;
  loadingFallback: ReactNode;
};

const PersistAuthGate = ({ children, loadingFallback }: Props) => {
  const { token, isLoggedIn } = useAuth();
  const { relogin, isLoading } = useRelogin();

  useEffect(() => {
    if (token) {
      relogin();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{(token && !isLoggedIn) || isLoading ? loadingFallback : children}</>;
};

export default PersistAuthGate;
