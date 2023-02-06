import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LoadingScreen } from 'common/components';

import AntDesign from './providers/AntDesign';
import Recoil from './providers/Recoil';
import Query from './providers/Query';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import PersistAuthGate from './PersistAuthGate';
import App from './App';

const Root = () => (
  <GlobalErrorBoundary>
    <Recoil>
      <AntDesign>
        <Suspense fallback={<LoadingScreen fullVPHeight />}>
          <Query>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PersistAuthGate>
          </Query>
        </Suspense>
      </AntDesign>
    </Recoil>
  </GlobalErrorBoundary>
);

export default Root;
