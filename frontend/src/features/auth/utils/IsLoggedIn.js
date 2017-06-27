import { UserAuthWrapper } from 'redux-auth-wrapper';
import { routerActions } from 'react-router-redux';
import { selectAuth } from '../ducks';

export default UserAuthWrapper({
  authSelector: state => selectAuth(state),
  predicate: auth => auth.user !== null,
  authenticatingSelector: state => state.auth.isAuthenticating,
  failureRedirectPath: '/auth/login',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'IsLoggedIn',
});
