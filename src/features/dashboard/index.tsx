import { Suspense, lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { useFetchUser } from '@/api';
import { useAuth, useSignOut } from '@/common/auth';
import { Loading, NotFound, ResultError } from '@/common/components';

import { DASHBOARD_ROUTES } from './routes';
import Layout from './components/Layout';

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
    return <Loading />;
  }

  if (userIsError) {
    return (
      <ResultError
        error={userError}
        onReset={() => window.location.reload()}
        className="container"
      />
    );
  }

  return (
    <Routes>
      <Route
        element={
          <Layout userEmail={data.user.email}>
            <Suspense fallback={<Loading />}>
              <Outlet />
            </Suspense>
          </Layout>
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
