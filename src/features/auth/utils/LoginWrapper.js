import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { routerActions } from 'react-router-redux';

import { selectIsInProgress } from '../../../features/spinner/ducks';

import { selectAuth } from '../ducks';
import { apiCallIds } from '../api';

const locationHelper = locationHelperBuilder({});

export default connectedReduxRedirect({
  authenticatingSelector: state => selectIsInProgress(state, apiCallIds.LOGIN),
  allowRedirectBack: false,
  authenticatedSelector: state => selectAuth(state).user === null,
  redirectAction: routerActions.replace,
  redirectPath: (state, props) => locationHelper.getRedirectQueryParam(props) || '/',
  wrapperDisplayName: 'LoginWrapper',
});
