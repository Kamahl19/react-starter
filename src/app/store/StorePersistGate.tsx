import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { reloginAction, selectIsLoggedIn } from 'common/services/user';
import { LoadingScreen } from 'common/components';
import { AUTH_ROUTER_PATHS } from 'features/auth/constants';

import { AppState } from './';
import { persistor } from './configureStore';
import history from '../history';

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = {
  relogin: reloginAction,
};

type Props = {
  children: ReactNode;
  isLoggedIn: boolean;
  relogin: (...args: any[]) => any; // TODO action
};

const StorePersistGate = ({ children, isLoggedIn, relogin }: Props) => (
  <PersistGate
    loading={<LoadingScreen />}
    onBeforeLift={() => {
      if (isLoggedIn && history.location.pathname !== AUTH_ROUTER_PATHS.logout) {
        relogin();
      }
    }}
    persistor={persistor}
  >
    {children}
  </PersistGate>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StorePersistGate);
