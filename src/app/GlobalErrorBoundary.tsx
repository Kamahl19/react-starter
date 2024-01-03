import { type ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ResultError } from '@/common/components';

type Props = {
  children: ReactNode;
};

const GlobalErrorBoundary = ({ children }: Props) => (
  <ErrorBoundary
    FallbackComponent={({
      resetErrorBoundary,
      error,
    }: {
      error: unknown;
      resetErrorBoundary: VoidFunction;
    }) => <ResultError onReset={resetErrorBoundary} error={error} className="container" />}
    onReset={() => window.location.reload()}
  >
    {children}
  </ErrorBoundary>
);

export default GlobalErrorBoundary;
