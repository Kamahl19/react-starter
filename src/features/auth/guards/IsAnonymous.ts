import { ComponentType } from 'react';
import {
  connectedReduxRedirect,
  InjectedAuthReduxProps,
} from 'redux-auth-wrapper/history4/redirect';
import { routerActions } from 'connected-react-router';

import { rootPath } from 'config';
import { AppState } from 'app/store';
import { selectIsLoggedIn, selectIsAuthenticating } from 'common/services/user';

const IsAnonymous = <OwnProps>(Component: ComponentType<OwnProps & InjectedAuthReduxProps>) =>
  connectedReduxRedirect<OwnProps, AppState>({
    allowRedirectBack: false,
    authenticatedSelector: state => !selectIsLoggedIn(state),
    authenticatingSelector: selectIsAuthenticating,
    redirectAction: routerActions.replace,
    redirectPath: rootPath,
    wrapperDisplayName: 'IsAnonymous',
  })(Component);

export default IsAnonymous;
