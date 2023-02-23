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
      <Suspense fallback={<LoadingScreen fullVPHeight />}>
        <AntDesign>
          <Query>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PersistAuthGate>
          </Query>
        </AntDesign>
      </Suspense>
    </Recoil>
  </GlobalErrorBoundary>
);

export default Root;
