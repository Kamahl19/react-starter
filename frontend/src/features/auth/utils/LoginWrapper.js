import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { routerActions } from 'react-router-redux';
import { selectIsInProgress } from '@src/features/spinner/ducks';
import { selectAuth } from '../ducks';
import { apiCallIds } from '../api';

const locationHelper = locationHelperBuilder({});

export default connectedReduxRedirect({
  redirectPath: (state, props) => locationHelper.getRedirectQueryParam(props) || '/',
  redirectAction: routerActions.replace,
  authenticatedSelector: state => selectAuth(state).user === null,
  authenticatingSelector: state => selectIsInProgress(state, apiCallIds.LOGIN),
  wrapperDisplayName: 'LoginWrapper',
  allowRedirectBack: false,
});
