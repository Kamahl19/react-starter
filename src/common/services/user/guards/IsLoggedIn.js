import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

import { ROUTE_PATHS } from '../../../../features/auth/routes';

export default connectedReduxRedirect({
  allowRedirectBack: ({ location }) => location.pathname !== ROUTE_PATHS.logout,
  authenticatedSelector: selectIsLoggedIn,
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: ROUTE_PATHS.login,
  wrapperDisplayName: 'IsLoggedIn',
});
