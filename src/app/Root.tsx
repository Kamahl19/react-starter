import { Suspense } from 'react';

import { LoadingScreen } from 'common/components';

import AntDesign from './providers/AntDesign';
import Recoil from './providers/Recoil';
import Query from './providers/Query';
import Router from './providers/Router';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import PersistAuthGate from './PersistAuthGate';
import App from './App';

const GlobalLoading = () => <LoadingScreen fullVPHeight />;

const Root = () => (
  <GlobalErrorBoundary>
    <Recoil>
      <Suspense fallback={<GlobalLoading />}>
        <AntDesign>
          <Query>
            <PersistAuthGate loadingFallback={<GlobalLoading />}>
              <Router>
                <App />
              </Router>
            </PersistAuthGate>
          </Query>
        </AntDesign>
      </Suspense>
    </Recoil>
  </GlobalErrorBoundary>
);

export default Root;
