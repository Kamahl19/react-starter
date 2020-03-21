import { ComponentType } from 'react';
import {
  connectedReduxRedirect,
  InjectedAuthReduxProps,
} from 'redux-auth-wrapper/history4/redirect';
import { replace } from 'connected-react-router';

import { rootPath } from 'config';
import { RootState } from 'app/store';

import { selectIsLoggedIn, selectIsAuthenticating } from '../';

const IsAnonymous = <OwnProps>(Component: ComponentType<OwnProps & InjectedAuthReduxProps>) =>
  connectedReduxRedirect<OwnProps, RootState>({
    allowRedirectBack: false,
    authenticatedSelector: (state) => !selectIsLoggedIn(state),
    authenticatingSelector: selectIsAuthenticating,
    redirectAction: replace,
    redirectPath: rootPath,
    wrapperDisplayName: 'IsAnonymous',
  })(Component);

export default IsAnonymous;
