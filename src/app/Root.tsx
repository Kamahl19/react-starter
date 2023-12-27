import { Suspense } from 'react';

import { LoadingScreen } from '@/common/components';

import ThemeProvider from './providers/Theme';
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
        <ThemeProvider>
          <Query>
            <PersistAuthGate loadingFallback={<GlobalLoading />}>
              <Router>
                <App />
              </Router>
            </PersistAuthGate>
          </Query>
        </ThemeProvider>
      </Suspense>
    </Jotai>
  </GlobalErrorBoundary>
);

export default Root;
