import { Suspense } from 'react';

import { LoadingScreen } from 'common/components';
import { PersistAuthGate } from 'common/auth';

import AntDesignConfig from './providers/AntDesignConfig';
import Recoil from './providers/Recoil';
import Router from './providers/Router';
import Query from './providers/Query';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import App from './App';

const Root = () => (
  <GlobalErrorBoundary>
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
  </GlobalErrorBoundary>
);

export default Root;
