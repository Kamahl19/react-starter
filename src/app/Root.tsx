import { Suspense } from 'react';
import { ConfigProvider, message } from 'antd';
import en_US from 'antd/lib/locale/en_US';
import { SWRConfig } from 'swr';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { LoadingScreen } from 'common/components';
import { PersistAuthGate } from 'common/auth';
import { swrConfig } from 'common/swr';

import Recoil from './Recoil';
import Router from './Router';
import App from './App';

message.config({ duration: 5 });

const antdConfig = {
  locale: en_US,
  pageHeader: { ghost: false },
};

const Root = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
    <Suspense fallback={<LoadingScreen fullVPHeight />}>
      <ConfigProvider {...antdConfig}>
        <Recoil>
          <SWRConfig value={swrConfig}>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <Router>
                <App />
              </Router>
            </PersistAuthGate>
          </SWRConfig>
        </Recoil>
      </ConfigProvider>
    </Suspense>
  </ErrorBoundary>
);

export default Root;

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => (
  <div>
    <h1>Unexpected Error</h1>
    <p>This is a problem on our side, not yours.</p>
    <p>
      <button onClick={resetErrorBoundary} type="button">
        Reload
      </button>
    </p>
  </div>
);
