import { Suspense, lazy } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import { useFetchUser } from '@/api';
import { LoadingScreen, NotFound, ResultError } from '@/common/components';
import { useAuth } from '@/common/auth';

import { DASHBOARD_ROUTES } from '../../routes';
import ProfileLayout from './components/ProfileLayout';

const ChangePassword = lazy(() => import('./pages/ChangePassword'));

const Profile = () => {
  const { userId } = useAuth();

  const { isPending, isError, error, data } = useFetchUser(userId);

  if (isPending) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <ResultError error={error} card />;
  }

  return (
    <Routes>
      <Route
        element={
          <ProfileLayout user={data.user}>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </ProfileLayout>
        }
      >
        <Route
          index
          element={<Navigate replace to={DASHBOARD_ROUTES.profileChangePassword.to} />}
        />
        <Route path={DASHBOARD_ROUTES.profileChangePassword.path} element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Profile;
