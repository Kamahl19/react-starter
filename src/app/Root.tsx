import { Suspense } from 'react';

import { LoadingScreen } from '@/common/components';

import AntDesign from './providers/AntDesign';
import Jotai from './providers/Jotai';
import Query from './providers/Query';
import Router from './providers/Router';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import PersistAuthGate from './PersistAuthGate';
import App from './App';

const GlobalLoading = () => <LoadingScreen fullVPHeight />;

const Root = () => (
  <GlobalErrorBoundary>
    <Jotai>
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
    </Jotai>
  </GlobalErrorBoundary>
);

export default Root;
