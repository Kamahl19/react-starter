import { Routes, Route, Navigate } from 'react-router-dom';

import { RequireIsLoggedIn, RequireIsAnonymous, useAuth } from 'common/auth';
import { NotFound } from 'common/components';

import Auth from 'features/auth';
import { AUTH_ROUTES } from 'features/auth/routes';
import Dashboard from 'features/dashboard';
import { DASHBOARD_ROUTES } from 'features/dashboard/routes';

const rootPath = '/';

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
      <Route
        path={AUTH_ROUTES.index.path}
        element={
          <RequireIsAnonymous redirectTo={rootPath}>
            <Auth />
          </RequireIsAnonymous>
        }
      />
      <Route
        path={DASHBOARD_ROUTES.index.path}
        element={
          <RequireIsLoggedIn redirectTo={rootPath}>
            <Dashboard />
          </RequireIsLoggedIn>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
