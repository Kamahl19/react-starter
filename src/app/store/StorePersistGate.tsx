import { ReactNode } from 'react';
import { connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { reloginAction, selectIsLoggedIn } from 'common/services/auth';
import { LoadingScreen } from 'common/components';
import { AUTH_ROUTER_PATHS } from 'features/auth/constants';

import history from '../history';

import { persistor } from './configureStore';
import { RootState } from './';

const mapStateToProps = (state: RootState) => ({
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = {
  relogin: reloginAction,
};

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps & {
    children: ReactNode;
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

export default connect(mapStateToProps, mapDispatchToProps)(StorePersistGate);
