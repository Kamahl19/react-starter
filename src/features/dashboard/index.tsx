import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

import { useFetchUser } from 'api';
import { useAuth } from 'common/auth';
import { LoadingScreen, NotFound } from 'common/components';

import { DASHBOARD_ROUTES } from './routes';
import DashboardLayout from './components/DashboardLayout';
import Home from './features/home';
import Profile from './features/profile';

const Dashboard = () => {
  const { userId, logout, isLogoutLoading } = useAuth();

  const userQuery = useFetchUser(userId);

  if (userQuery.isLoading || isLogoutLoading) {
    return <LoadingScreen fullVPHeight />;
  }

  if (userQuery.isError) {
    throw userQuery.error;
  }

  return (
    <Routes>
      <Route
        element={
          <DashboardLayout email={userQuery.data.user.email} logout={logout}>
            <Outlet />
          </DashboardLayout>
        }
      >
        <Route index element={<Navigate replace to={DASHBOARD_ROUTES.home.to} />} />
        <Route path={DASHBOARD_ROUTES.home.path} element={<Home />} />
        <Route path={DASHBOARD_ROUTES.profile.path} element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
