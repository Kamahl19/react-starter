import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { APP_ROUTER_PATHS } from '../../../../app/Root';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

export default connectedReduxRedirect({
  allowRedirectBack: false,
  authenticatedSelector: state => !selectIsLoggedIn(state),
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: APP_ROUTER_PATHS.root,
  wrapperDisplayName: 'IsAnonymous',
});
