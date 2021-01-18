import { Route, Switch, Redirect } from 'react-router-dom';

import { NotFound } from 'common/components';
import IsAnonymous from 'common/services/auth/guards/IsAnonymous';
import LoginGuard from 'common/services/auth/guards/LoginGuard';
import LogoutGuard from 'common/services/auth/guards/LogoutGuard';

import ForgottenPassword from './screens/ForgottenPassword';
import Login from './screens/Login';
import Logout from './screens/Logout';
import ResetPassword from './screens/ResetPassword';
import ActivateAccount from './screens/ActivateAccount';
import SignUp from './screens/SignUp';
import { AUTH_ROUTE_PREFIX, AUTH_ROUTER_PATHS } from './constants';

export type ResetPasswordParams = {
  token: string;
};

export type ActivateAccountParams = {
  userId: string;
  token: string;
};

const LoginPage = LoginGuard(Login);
const LogoutPage = LogoutGuard(Logout);
const SignUpPage = IsAnonymous(SignUp);
const ForgottenPasswordPage = IsAnonymous(ForgottenPassword);
const ResetPasswordPage = IsAnonymous(ResetPassword);

const AuthRoutes = () => (
  <Switch>
    <Route
      exact
      path={AUTH_ROUTE_PREFIX}
      render={() => <Redirect to={AUTH_ROUTER_PATHS.login} />}
    />
    <Route exact path={AUTH_ROUTER_PATHS.login} component={LoginPage} />
    <Route exact path={AUTH_ROUTER_PATHS.logout} component={LogoutPage} />
    <Route exact path={AUTH_ROUTER_PATHS.signUp} component={SignUpPage} />
    <Route exact path={AUTH_ROUTER_PATHS.forgottenPassword} component={ForgottenPasswordPage} />
    <Route exact path={AUTH_ROUTER_PATHS.resetPassword} component={ResetPasswordPage} />
    <Route exact path={AUTH_ROUTER_PATHS.activateAccount} component={ActivateAccount} />
    <Route component={NotFound} />
  </Switch>
);

export default AuthRoutes;
