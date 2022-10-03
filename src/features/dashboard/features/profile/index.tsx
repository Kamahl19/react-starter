import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

import { useFetchUser } from 'api';
import { LoadingScreen, NotFound } from 'common/components';
import { useAuth } from 'common/auth';

import { DASHBOARD_ROUTES } from '../../routes';
import ProfileLayout from './components/ProfileLayout';
import ChangePassword from './pages/ChangePassword';

const Profile = () => {
  const { userId } = useAuth();

  const userQuery = useFetchUser(userId);

  if (userQuery.isLoading) {
    return <LoadingScreen />;
  }

  if (userQuery.isError) {
    throw userQuery.error;
  }

  return (
    <Routes>
      <Route
        element={
          <ProfileLayout user={userQuery.data.user}>
            <Outlet />
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
