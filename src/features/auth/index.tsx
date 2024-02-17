import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

import { rootPath } from '@/config';
import { RequireIsAnonymous } from '@/common/auth';
import { Loading, NotFound } from '@/common/components';

import { AUTH_ROUTES } from './routes';
import Layout from './components/Layout';

const SignUp = lazy(() => import('./pages/SignUp'));
const SignIn = lazy(() => import('./pages/SignIn'));
const ConfirmEmail = lazy(() => import('./pages/ConfirmEmail'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

const Auth = () => (
  <Routes>
    <Route
      element={
        <Layout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Layout>
      }
    >
      <Route element={<RequireIsAnonymous redirectTo={rootPath} />}>
        <Route index element={<Navigate replace to={AUTH_ROUTES.signIn.to} />} />
        <Route path={AUTH_ROUTES.signIn.path} element={<SignIn />} />
        <Route path={AUTH_ROUTES.signUp.path} element={<SignUp />} />
      </Route>
      <Route path={AUTH_ROUTES.confirmEmail.path} element={<ConfirmEmail />} />
      <Route path={AUTH_ROUTES.resetPassword.path} element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Auth;
