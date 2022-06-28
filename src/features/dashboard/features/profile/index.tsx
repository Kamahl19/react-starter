import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import { useFetchUser } from 'api';
import { LoadingScreen, NotFound } from 'common/components';
import { useAuth } from 'common/auth';

import { DASHBOARD_ROUTES } from '../../routes';
import ProfileHeader from './components/ProfileHeader';
import ProfileWidget from './components/ProfileWidget';
import ChangePasswordContainer from './containers/ChangePassword';

const ProfileContainer = () => {
  const { userId = '' } = useAuth();

  const { user } = useFetchUser(userId);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      <Route
        element={
          <>
            <ProfileHeader user={user} />
            <ProfileWidget>
              <Outlet />
            </ProfileWidget>
          </>
        }
      >
        <Route
          index
          element={<Navigate replace to={DASHBOARD_ROUTES.profileChangePassword.to} />}
        />
        <Route
          path={DASHBOARD_ROUTES.profileChangePassword.path}
          element={<ChangePasswordContainer />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default ProfileContainer;
