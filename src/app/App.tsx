import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { rootPath } from '@/config';
import { RequireIsLoggedIn, useAuth } from '@/common/auth';
import { NotFound } from '@/common/components';

import { AUTH_ROUTES } from '@/features/auth/routes';
import { DASHBOARD_ROUTES } from '@/features/dashboard/routes';

const Auth = lazy(() => import('@/features/auth'));
const Dashboard = lazy(() => import('@/features/dashboard'));

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path={rootPath}
        element={
          <Navigate replace to={isLoggedIn ? DASHBOARD_ROUTES.index.to : AUTH_ROUTES.index.to} />
        }
      />
      <Route path={AUTH_ROUTES.index.path} element={<Auth />} />
      <Route element={<RequireIsLoggedIn redirectTo={rootPath} />}>
        <Route path={DASHBOARD_ROUTES.index.path} element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
