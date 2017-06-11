import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectAuth } from '../ducks';

export default UserAuthWrapper({
  authSelector: selectAuth,
  predicate: auth => auth.user !== null,
  authenticatingSelector: auth => auth.isAuthenticating,
  failureRedirectPath: '/auth/login',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'IsLoggedIn',
});
