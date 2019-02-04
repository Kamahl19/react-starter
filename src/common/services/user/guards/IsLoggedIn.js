import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

export default connectedReduxRedirect({
  allowRedirectBack: ({ location }) => location.pathname !== '/logout',
  authenticatedSelector: selectIsLoggedIn,
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: '/login',
  wrapperDisplayName: 'IsLoggedIn',
});
