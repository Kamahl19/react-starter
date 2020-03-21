import { ComponentType } from 'react';
import {
  connectedReduxRedirect,
  InjectedAuthReduxProps,
} from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { replace } from 'connected-react-router';

import { rootPath } from 'config';
import { RootState } from 'app/store';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

const locationHelper = locationHelperBuilder({});

const LoginGuard = <OwnProps>(Component: ComponentType<OwnProps & InjectedAuthReduxProps>) =>
  connectedReduxRedirect<OwnProps, RootState>({
    allowRedirectBack: false,
    authenticatedSelector: (state) => !selectIsLoggedIn(state),
    authenticatingSelector: selectIsAuthenticating,
    redirectAction: replace,
    redirectPath: (_, props) => locationHelper.getRedirectQueryParam(props) || rootPath,
    wrapperDisplayName: 'LoginGuard',
  })(Component);

export default LoginGuard;
