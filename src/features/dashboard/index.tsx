import { Suspense, lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { useFetchUser } from '@/api';
import { useAuth, useSignOut } from '@/common/auth';
import { LoadingScreen, NotFound, ResultError } from '@/common/components';

import { DASHBOARD_ROUTES } from './routes';
import DashboardLayout from './components/DashboardLayout';

const Bookshelf = lazy(() => import('./features/bookshelf'));
const Profile = lazy(() => import('./features/profile'));

const Dashboard = () => {
  const { userId } = useAuth();
  const { isPending: isSignOutPending } = useSignOut();

  const {
    isPending: userIsPending,
    isError: userIsError,
    error: userError,
    data,
  } = useFetchUser(userId);

  if (userIsPending || isSignOutPending) {
    return <LoadingScreen fullVPHeight />;
  }

  if (userIsError) {
    return <ResultError error={userError} onReset={() => window.location.reload()} fullVPHeight />;
  }

  return (
    <Routes>
      <Route
        element={
          <DashboardLayout user={data.user}>
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
