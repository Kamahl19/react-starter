import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

export default connectedReduxRedirect({
  authenticatedSelector: state => selectIsLoggedIn(state) === false,
  authenticatingSelector: selectIsAuthenticating,
  redirectAction: routerActions.replace,
  redirectPath: '/',
  allowRedirectBack: false,
  wrapperDisplayName: 'IsAnonymous',
});
