import { Route, Routes, Navigate } from 'react-router-dom';

import { useFetchUser } from 'api';
import { useAuth, useLogout } from 'common/auth';
import { LoadingScreen, NotFound } from 'common/components';

import { DASHBOARD_ROUTES } from './routes';
import DashboardLayout from './components/DashboardLayout';
import Home from './features/home';
import Profile from './features/profile';

const DashboardContainer = () => {
  const { userId = '' } = useAuth();

  const logout = useLogout();

  const { user } = useFetchUser(userId);

  if (!user) {
    return <LoadingScreen fullVPHeight />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout email={user.email} logout={logout} />}>
        <Route index element={<Navigate replace to={DASHBOARD_ROUTES.home.to} />} />
        <Route path={DASHBOARD_ROUTES.home.path} element={<Home />} />
        <Route path={DASHBOARD_ROUTES.profile.path} element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default DashboardContainer;
