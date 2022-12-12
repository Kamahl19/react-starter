import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

import { useFetchUser } from 'api';
import { useAuth } from 'common/auth';
import { LoadingScreen, NotFound, ResultError } from 'common/components';

import { DASHBOARD_ROUTES } from './routes';
import DashboardLayout from './components/DashboardLayout';
import Home from './features/home';
import Profile from './features/profile';

const Dashboard = () => {
  const { userId, isLogoutLoading } = useAuth();

  const {
    isLoading: userIsLoading,
    isError: userIsError,
    error: userError,
    data,
  } = useFetchUser(userId);

  if (userIsLoading || isLogoutLoading) {
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
