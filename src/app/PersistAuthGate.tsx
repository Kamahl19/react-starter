import { type ReactNode } from 'react';

import { useAuth, useRelogin } from '@/common/auth';
import { useOnMount } from '@/common/hooks';

type Props = {
  children: ReactNode;
  loadingFallback: ReactNode;
};

const PersistAuthGate = ({ children, loadingFallback }: Props) => {
  const { token, isLoggedIn } = useAuth();
  const { relogin, isPending } = useRelogin();

  useOnMount(() => {
    if (token) {
      relogin();
    }
  });

  return <>{(token && !isLoggedIn) || isPending ? loadingFallback : children}</>;
};

export default PersistAuthGate;
