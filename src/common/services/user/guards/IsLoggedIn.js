import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { AUTH_ROUTER_PATHS } from '../../../../features/auth/routes';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

export default connectedReduxRedirect({
  allowRedirectBack: ({ location }) => location.pathname !== AUTH_ROUTER_PATHS.logout,
  authenticatedSelector: selectIsLoggedIn,
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: AUTH_ROUTER_PATHS.login,
  wrapperDisplayName: 'IsLoggedIn',
});
