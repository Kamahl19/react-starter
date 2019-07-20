import { ComponentType } from 'react';
import {
  connectedReduxRedirect,
  InjectedAuthReduxProps,
} from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { AppState } from 'app/store';
import { selectIsLoggedIn, selectIsAuthenticating } from 'common/services/user';

import { AUTH_ROUTER_PATHS } from '../constants';

const LogoutGuard = <OwnProps>(Component: ComponentType<OwnProps & InjectedAuthReduxProps>) =>
  connectedReduxRedirect<OwnProps, AppState>({
    allowRedirectBack: false,
    authenticatedSelector: selectIsLoggedIn,
    authenticatingSelector: selectIsAuthenticating,
    redirectAction: routerActions.replace,
    redirectPath: AUTH_ROUTER_PATHS.login,
    wrapperDisplayName: 'LogoutGuard',
  })(Component);

export default LogoutGuard;
