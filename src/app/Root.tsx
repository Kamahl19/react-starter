import { Suspense, ReactNode } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ConfigProvider, Spin } from 'antd';
import en_US from 'antd/lib/locale/en_US';
import { Route, Switch } from 'react-router-dom';

import { rootPath } from 'config';
import { ErrorBoundary, NotFound, LoadingScreen } from 'common/components';
import { useTrackProgress } from 'common/services/trackProgress';
import AuthRoutes from 'features/auth/routes';
import { AUTH_ROUTE_PREFIX } from 'features/auth/constants';

import { store, StorePersistGate } from './store';
import history from './history';
import DemoScreen from './DemoScreen';

const Root = () => (
  <ErrorBoundary>
    <ConfigProvider locale={en_US}>
      <Suspense fallback={<LoadingScreen />}>
        <Provider store={store}>
          <StorePersistGate>
            <ConnectedRouter history={history}>
              <GlobalSpinner>
                <Switch>
                  <Route exact path={rootPath} component={DemoScreen} />
                  <Route path={AUTH_ROUTE_PREFIX} component={AuthRoutes} />
                  <Route component={NotFound} />
                </Switch>
              </GlobalSpinner>
            </ConnectedRouter>
          </StorePersistGate>
        </Provider>
      </Suspense>
    </ConfigProvider>
  </ErrorBoundary>
);

export default Root;

const GlobalSpinner = ({ children }: { children: ReactNode }) => {
  const isInProgress = useTrackProgress();

  return (
    <Spin spinning={isInProgress} size="large">
      {children}
    </Spin>
  );
};
