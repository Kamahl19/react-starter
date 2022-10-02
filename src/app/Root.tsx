import { Suspense } from 'react';
import { SWRConfig } from 'swr';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { LoadingScreen } from 'common/components';
import { PersistAuthGate } from 'common/auth';
import { swrConfig } from 'common/swr';

import AntDesignConfig from './AntDesignConfig';
import Recoil from './Recoil';
import Router from './Router';
import App from './App';

const Root = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
    <Suspense fallback={<LoadingScreen fullVPHeight />}>
      <AntDesignConfig>
        <Recoil>
          <SWRConfig value={swrConfig}>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <Router>
                <App />
              </Router>
            </PersistAuthGate>
          </SWRConfig>
        </Recoil>
      </AntDesignConfig>
    </Suspense>
  </ErrorBoundary>
);

export default Root;

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div
    style={{
      display: 'grid',
      placeContent: 'center',
      height: '100%',
    }}
  >
    <h1>Unexpected Error</h1>
    <p>This is a problem on our side, not yours.</p>
    <p>
      <button onClick={resetErrorBoundary} type="button">
        Reload
      </button>
    </p>
  </div>
);
