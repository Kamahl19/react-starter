import React, { Suspense, ReactNode } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Route, Switch } from 'react-router-dom';

import { useSpinner } from 'packages/spinner';

import { rootPath } from 'config';
import { ErrorBoundary, NotFound, Spin, LoadingScreen } from 'common/components';
import AuthRoutes from 'features/auth/routes';
import { AUTH_ROUTE_PREFIX } from 'features/auth/constants';

import { store, StorePersistGate } from './store';
import history from './history';
import DemoScreen from './DemoScreen';

const Root = () => (
  <ErrorBoundary>
    <LocaleProvider locale={enUS}>
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
    </LocaleProvider>
  </ErrorBoundary>
);

export default Root;

const GlobalSpinner = ({ children }: { children: ReactNode }) => {
  const isLoading = useSpinner();

  return (
    <Spin spinning={isLoading} size="large">
      {children}
    </Spin>
  );
};
