import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { type User } from '@/api';
import { Logo } from '@/common/components';
import AdminLayout from '@/common/components/AdminLayout';

import { DASHBOARD_ROUTES } from '../../routes';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
  user: User;
};

const DashboardLayout = ({ user, children }: Props) => (
  <AdminLayout
    logo={
      <Link to={DASHBOARD_ROUTES.index.to}>
        <Logo />
      </Link>
    }
    headerContent={<Header email={user.email} />}
    sidebarContent={<Sidebar />}
  >
    {children}
  </AdminLayout>
);

export default DashboardLayout;
