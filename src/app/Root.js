import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';
import { Route, Switch, Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import RouterScrollToTop from '../packages/router-scroll-to-top';
import { useSpinner } from '../packages/spinner';

// must be first
import { store, history } from './store/configureStore';
import StorePersistGate from './store/StorePersistGate';
// order matters
import { rootPath } from '../config';
import { ErrorBoundary, NotFound, Spin } from '../common/components';
import AuthRoutes from '../features/auth/routes';
import { AUTH_ROUTER_PATHS } from '../features/auth/constants';
import IsLoggedIn from '../features/auth/guards/IsLoggedIn';

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
                      <Link to={AUTH_ROUTER_PATHS.logout}>
                        <Trans i18nKey="logout">Logout</Trans>
                      </Link>
                    ))}
                  />
                  <AuthRoutes />
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

const GlobalSpinnerProvider = ({ children }) => {
  const isVisible = useSpinner();

  return (
    <Spin spinning={isVisible} size="large">
      {children}
    </Spin>
  );
};
