import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { rootPath } from '../../../../config';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

export default connectedReduxRedirect({
  allowRedirectBack: false,
  authenticatedSelector: state => !selectIsLoggedIn(state),
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: rootPath,
  wrapperDisplayName: 'IsAnonymous',
});
