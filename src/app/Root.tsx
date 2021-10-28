import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ConfigProvider, message } from 'antd';
import en_US from 'antd/lib/locale/en_US';

import { rootPath } from 'config';
import { ErrorBoundary, NotFound, LoadingScreen } from 'common/components';
import AuthRoutes from 'features/auth/routes';
import { AUTH_ROUTE_PREFIX } from 'features/auth/constants';

import { store, StorePersistGate } from './store';
import history from './history';
import DemoScreen from './DemoScreen';

message.config({ duration: 5 });

const antdConfig = {
  locale: en_US,
};

const Root = () => (
  <ErrorBoundary>
    <ConfigProvider {...antdConfig}>
      <Suspense fallback={<LoadingScreen fullVPHeight />}>
        <Provider store={store}>
          <StorePersistGate loading={<LoadingScreen fullVPHeight />}>
            <ConnectedRouter history={history}>
              <LoadingScreen fullVPHeight isGlobal />
              <Switch>
                <Route exact path={rootPath} component={DemoScreen} />
                <Route path={AUTH_ROUTE_PREFIX} component={AuthRoutes} />
                <Route component={NotFound} />
              </Switch>
            </ConnectedRouter>
          </StorePersistGate>
        </Provider>
      </Suspense>
    </ConfigProvider>
  </ErrorBoundary>
);

export default Root;
