import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { LoadingScreen } from 'common/components';

import AntDesign from './providers/AntDesign';
import Recoil from './providers/Recoil';
import PersistAuthGate from './PersistAuthGate';
import Query from './providers/Query';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import App from './App';

const Root = () => (
  <GlobalErrorBoundary>
    <AntDesign>
      <Suspense fallback={<LoadingScreen fullVPHeight />}>
        <Recoil>
          <Query>
            <PersistAuthGate loading={<LoadingScreen fullVPHeight />}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </PersistAuthGate>
          </Query>
        </Recoil>
      </Suspense>
    </AntDesign>
  </GlobalErrorBoundary>
);

export default Root;
