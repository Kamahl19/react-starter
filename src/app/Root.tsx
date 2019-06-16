import React, { ReactNode } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Route, Switch, Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import RouterScrollToTop from 'packages/router-scroll-to-top';
import { useSpinner } from 'packages/spinner';

// Importing Store must be first
import { store, history, StorePersistGate } from './store';

import { rootPath } from 'config';
import { ErrorBoundary, NotFound, Spin } from 'common/components';
import AuthRoutes from 'features/auth/routes';
import { AUTH_ROUTER_PATHS, AUTH_ROUTE_PREFIX } from 'features/auth/constants';
import IsLoggedIn from 'features/auth/guards/IsLoggedIn';

const Root = () => (
  <ErrorBoundary>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <StorePersistGate>
          <ConnectedRouter history={history}>
            <RouterScrollToTop>
              <GlobalSpinnerProvider>
                <Switch>
                  <Route
                    exact
                    path={rootPath}
                    component={IsLoggedIn(() => (
                      <LoggedInScreen />
                    ))}
                  />
                  <Route path={AUTH_ROUTE_PREFIX} component={AuthRoutes} />
                  <Route component={NotFound} />
                </Switch>
              </GlobalSpinnerProvider>
            </RouterScrollToTop>
          </ConnectedRouter>
        </StorePersistGate>
      </Provider>
    </LocaleProvider>
  </ErrorBoundary>
);

export default Root;

type Props = {
  children: ReactNode;
};

const GlobalSpinnerProvider = ({ children }: Props) => {
  const isLoading = useSpinner();

  return (
    <Spin spinning={isLoading} size="large">
      {children}
    </Spin>
  );
};

// Throw-away component, just for demo purposes
const LoggedInScreen = () => (
  <Link to={AUTH_ROUTER_PATHS.logout}>
    <Trans i18nKey="auth.logout">Logout</Trans>
  </Link>
);