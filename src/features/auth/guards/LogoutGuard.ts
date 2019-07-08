import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { selectIsLoggedIn, selectIsAuthenticating } from 'common/services/user';

import { AUTH_ROUTER_PATHS } from '../constants';

export default connectedReduxRedirect({
  allowRedirectBack: false,
  authenticatedSelector: selectIsLoggedIn,
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: AUTH_ROUTER_PATHS.login,
  wrapperDisplayName: 'LogoutGuard',
});
