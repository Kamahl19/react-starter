import { type ReactNode } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { SessionContextProvider } from '@/common/auth';

type Props = {
  children: ReactNode;
  loadingFallback: ReactNode;
};

const SupabaseAuth = ({ children, loadingFallback }: Props) => {
  const { showBoundary } = useErrorBoundary();

  return (
    <SessionContextProvider onError={showBoundary}>
      {({ isPending }) => (isPending ? loadingFallback : children)}
    </SessionContextProvider>
  );
};

export default SupabaseAuth;
