import React, { Suspense, ReactNode } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Route, Switch, Link } from 'react-router-dom';

import { useSpinner } from 'packages/spinner';

import { rootPath } from 'config';
import { ErrorBoundary, NotFound, Spin, LoadingScreen } from 'common/components';
import AuthRoutes from 'features/auth/routes';
import { AUTH_ROUTER_PATHS, AUTH_ROUTE_PREFIX } from 'features/auth/constants';
import IsLoggedIn from 'features/auth/guards/IsLoggedIn';

import { store, StorePersistGate } from './store';
import history from './history';

const Root = () => (
  <ErrorBoundary>
    <LocaleProvider locale={enUS}>
      <Suspense fallback={<LoadingScreen />}>
        <Provider store={store}>
          <StorePersistGate>
            <ConnectedRouter history={history}>
              <GlobalSpinner>
                <Switch>
                  <Route exact path={rootPath} component={LoggedInScreen} />
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

// Throw-away component, just for demo purposes
const LoggedInScreen = IsLoggedIn(() => <Link to={AUTH_ROUTER_PATHS.logout}>Logout</Link>);
