import { Suspense, lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { useSignOut } from '@/api';
import { useAuth } from '@/common/auth';
import { LoadingScreen, NotFound } from '@/common/components';

import { DASHBOARD_ROUTES } from './routes';
import DashboardLayout from './components/DashboardLayout';

const Bookshelf = lazy(() => import('./features/bookshelf'));
const Profile = lazy(() => import('./features/profile'));

const Dashboard = () => {
  const { user } = useAuth();
  const { isPending: isSignOutPending } = useSignOut();

  if (isSignOutPending) {
    return <LoadingScreen fullVPHeight />;
  }

  return (
    <Routes>
      <Route
        element={
          <DashboardLayout user={user}>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        }
      >
        <Route index element={<Navigate replace to={DASHBOARD_ROUTES.bookshelf.to} />} />
        <Route path={DASHBOARD_ROUTES.bookshelf.path} element={<Bookshelf />} />
        <Route path={DASHBOARD_ROUTES.profile.path} element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
