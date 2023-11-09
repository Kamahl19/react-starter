import { type ReactNode } from 'react';

import { type User } from '@/api';
import { useTheme, Theme } from '@/app/theme';
import { Logo } from '@/common/components';
import { AdminLayout, SidebarState, useAdminLayoutContext } from '@/common/components/AdminLayout';

import { DASHBOARD_ROUTES } from '../../routes';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: ReactNode;
  user: User;
};

const DashboardLayout = ({ user, children }: Props) => (
  <AdminLayout
    logo={<SidebarLogo />}
    headerContent={<Header email={user.email} />}
    sidebarContent={<Sidebar />}
  >
    {children}
  </AdminLayout>
);

export default DashboardLayout;

const SidebarLogo = () => {
  const { sidebarState } = useAdminLayoutContext();
  const [theme] = useTheme();

  return (
    <Logo
      to={DASHBOARD_ROUTES.index.to}
      inverted={theme === Theme.DARK}
      isSmall={sidebarState === SidebarState.COLLAPSED_SIDEBAR}
    />
  );
};
