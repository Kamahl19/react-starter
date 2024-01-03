import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { rootPath } from '@/config';
import { RequireIsLoggedIn, useAuth } from '@/common/auth';

import { AUTH_ROUTES } from '@/features/auth/routes';
import { DASHBOARD_ROUTES } from '@/features/dashboard/routes';

const Auth = lazy(() => import('@/features/auth'));
const Dashboard = lazy(() => import('@/features/dashboard'));

const App = () => {
  const { isLoggedIn } = useAuth();

  const RedirectToRoot = (
    <Navigate replace to={isLoggedIn ? DASHBOARD_ROUTES.index.to : AUTH_ROUTES.index.to} />
  );

  return (
    <Routes>
      <Route path={rootPath} element={RedirectToRoot} />
      <Route path={AUTH_ROUTES.index.path} element={<Auth />} />
      <Route element={<RequireIsLoggedIn redirectTo={rootPath} />}>
        <Route path={DASHBOARD_ROUTES.index.path} element={<Dashboard />} />
      </Route>
      <Route path="*" element={RedirectToRoot} />
    </Routes>
  );
};

export default App;
