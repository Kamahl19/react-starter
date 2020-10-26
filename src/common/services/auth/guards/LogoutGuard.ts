import { ComponentType } from 'react';
import {
  connectedReduxRedirect,
  InjectedAuthReduxProps,
} from 'redux-auth-wrapper/history4/redirect';
import { replace } from 'connected-react-router';

import { RootState } from 'app/store';
import { AUTH_ROUTER_PATHS } from 'features/auth/constants';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

const LogoutGuard = <OwnProps>(Component: ComponentType<OwnProps & InjectedAuthReduxProps>) =>
  connectedReduxRedirect<OwnProps, RootState>({
    allowRedirectBack: false,
    authenticatedSelector: selectIsLoggedIn,
    authenticatingSelector: selectIsAuthenticating,
    redirectAction: replace,
    redirectPath: AUTH_ROUTER_PATHS.login,
    wrapperDisplayName: 'LogoutGuard',
  })(Component);

export default LogoutGuard;
