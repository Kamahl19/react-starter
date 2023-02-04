import { type ReactNode } from 'react';

import { type User } from 'api';
import { Logo } from 'common/components';
import { AdminLayout } from 'common/components/AdminLayout';

import { DASHBOARD_ROUTES } from '../../routes';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  user: User;
  children: ReactNode;
};

const DashboardLayout = ({ user, children }: Props) => (
  <AdminLayout
    logo={<Logo to={DASHBOARD_ROUTES.home.to} />}
    headerContent={<Header email={user.email} />}
    sidebarContent={<Sidebar />}
  >
    {children}
  </AdminLayout>
);

export default DashboardLayout;
