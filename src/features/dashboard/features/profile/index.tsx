import { Suspense, lazy } from 'react';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';

import { Loading, NotFound } from '@/common/components';

import { DASHBOARD_ROUTES } from '../../routes';
import Layout from './components/Layout';

const ChangePassword = lazy(() => import('./pages/ChangePassword'));

const Profile = () => (
  <Routes>
    <Route
      element={
        <Layout>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </Layout>
      }
    >
      <Route index element={<Navigate replace to={DASHBOARD_ROUTES.profileChangePassword.to} />} />
      <Route path={DASHBOARD_ROUTES.profileChangePassword.path} element={<ChangePassword />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default Profile;
