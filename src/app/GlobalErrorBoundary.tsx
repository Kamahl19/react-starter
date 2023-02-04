import { type ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { centeredCss } from 'common/styleUtils';

type Props = {
  children: ReactNode;
};

const GlobalErrorBoundary = ({ children }: Props) => (
  <ErrorBoundary
    FallbackComponent={({ resetErrorBoundary, error }: FallbackProps) => (
      <div css={centeredCss}>
        <h1>Unexpected Error</h1>
        <p>This is a problem on our side, not yours.</p>
        <pre>Error: {error.message}</pre>
        <p>
          <button onClick={resetErrorBoundary} type="button">
            Try again
          </button>
        </p>
      </div>
    )}
    onReset={() => window.location.reload()}
  >
    {children}
  </ErrorBoundary>
);

export default GlobalErrorBoundary;
