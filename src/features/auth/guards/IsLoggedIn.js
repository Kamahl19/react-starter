import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { selectIsLoggedIn, selectIsAuthenticating } from '../../../common/services/user';

import { AUTH_ROUTER_PATHS } from '../routes';

export default connectedReduxRedirect({
  allowRedirectBack: ({ location }) => location.pathname !== AUTH_ROUTER_PATHS.logout,
  authenticatedSelector: selectIsLoggedIn,
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: AUTH_ROUTER_PATHS.login,
  wrapperDisplayName: 'IsLoggedIn',
});
