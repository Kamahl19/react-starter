import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { routerActions } from 'react-router-redux';

import { selectIsLoggedIn, selectIsAuthenticating } from '../../../common/services/user';

const locationHelper = locationHelperBuilder({});

export default connectedReduxRedirect({
  authenticatingSelector: selectIsAuthenticating,
  allowRedirectBack: false,
  authenticatedSelector: state => !selectIsLoggedIn(state),
  redirectAction: routerActions.replace,
  redirectPath: (state, props) => locationHelper.getRedirectQueryParam(props) || '/',
  wrapperDisplayName: 'LoginWrapper',
});
