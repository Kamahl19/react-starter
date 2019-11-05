import { ComponentType } from 'react';
import {
  connectedReduxRedirect,
  InjectedAuthReduxProps,
} from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { routerActions } from 'connected-react-router';

import { rootPath } from 'config';
import { RootState } from 'app/store';
import { selectIsLoggedIn, selectIsAuthenticating } from 'common/services/user';

const locationHelper = locationHelperBuilder({});

const LoginGuard = <OwnProps>(Component: ComponentType<OwnProps & InjectedAuthReduxProps>) =>
  connectedReduxRedirect<OwnProps, RootState>({
    allowRedirectBack: false,
    authenticatedSelector: state => !selectIsLoggedIn(state),
    authenticatingSelector: selectIsAuthenticating,
    redirectAction: routerActions.replace,
    redirectPath: (_, props) => locationHelper.getRedirectQueryParam(props) || rootPath, // TODO use Nullish Coalescing once supported
    wrapperDisplayName: 'LoginGuard',
  })(Component);

export default LoginGuard;
