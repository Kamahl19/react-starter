import React from 'react';
import { Redirect } from 'react-router-dom';
import connectedAuthWrapper from 'redux-auth-wrapper/connectedAuthWrapper';

import { selectIsLoggedIn } from '../../../common/services/user';

import AuthSpinner from '../components/AuthSpinner';
import { selectIsLoggingOut } from '../ducks';

export default connectedAuthWrapper({
  authenticatedSelector: selectIsLoggedIn,
  authenticatingSelector: selectIsLoggingOut,
  AuthenticatingComponent: AuthSpinner,
  FailureComponent: () => <Redirect to="/auth/login" />,
  wrapperDisplayName: 'RedirectSpinner',
});
