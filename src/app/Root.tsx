import { Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { LoadingScreen } from 'common/components';
import { PersistAuthGate } from 'common/auth';

import AntDesignConfig from './providers/AntDesignConfig';
import Recoil from './providers/Recoil';
import Router from './providers/Router';
import Query from './providers/Query';
import App from './App';

const Root = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
    <Suspense fallback={<LoadingScreen fullVPHeight />}>
      <AntDesignConfig>
        <Recoil>
          <Query>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <Router>
                <App />
              </Router>
            </PersistAuthGate>
          </Query>
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
