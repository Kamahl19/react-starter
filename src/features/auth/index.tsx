import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

import { NotFound } from 'common/components';

import { AUTH_ROUTES } from './routes';
import AuthLayout from './components/AuthLayout';
import SignUp from './pages/SignUp';
import ForgottenPassword from './pages/ForgottenPassword';
import Login from './pages/Login';
import ConfirmEmail from './pages/ConfirmEmail';
import ResetPassword from './pages/ResetPassword';

const Auth = () => (
  <Routes>
    <Route
      element={
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      }
    >
      <Route index element={<Navigate replace to={AUTH_ROUTES.login.to} />} />
      <Route path={AUTH_ROUTES.login.path} element={<Login />} />
      <Route path={AUTH_ROUTES.signUp.path} element={<SignUp />} />
      <Route path={AUTH_ROUTES.forgottenPassword.path} element={<ForgottenPassword />} />
      <Route path={AUTH_ROUTES.confirmEmail.path} element={<ConfirmEmail />} />
      <Route path={AUTH_ROUTES.resetPassword.path} element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Auth;
