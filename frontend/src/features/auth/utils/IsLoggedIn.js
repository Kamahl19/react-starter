import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'react-router-redux';
import { selectIsInProgress } from '../../../features/spinner/ducks';
import { selectAuth } from '../ducks';
import { apiCallIds } from '../api';

export default connectedReduxRedirect({
  redirectPath: '/auth/login',
  redirectAction: routerActions.replace,
  authenticatedSelector: state => selectAuth(state).user !== null,
  authenticatingSelector: state => selectIsInProgress(state, apiCallIds.LOGIN),
  wrapperDisplayName: 'IsLoggedIn',
});
