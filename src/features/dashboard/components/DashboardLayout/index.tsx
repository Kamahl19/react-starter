import { type ReactNode, useContext } from 'react';

import { Logo } from 'common/components';
import { AdminLayout, AdminLayoutContext, SidebarState } from 'common/components/AdminLayout';

import { DASHBOARD_ROUTES } from '../../routes';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  email: string;
  logout: VoidFunction;
  children: ReactNode;
};

const DashboardLayout = ({ email, logout, children }: Props) => (
  <AdminLayout
    className="dashboard-layout"
    smallLogo={<Logo to={DASHBOARD_ROUTES.home.to} size="small" style={{ paddingLeft: 12 }} />}
    logo={<DashboardLogo />}
    headerContent={<Header email={email} logout={logout} />}
    sidebarContent={<Sidebar />}
  >
    {children}
  </AdminLayout>
);

export default DashboardLayout;

const DashboardLogo = () => {
  const { sidebarState } = useContext(AdminLayoutContext);

  return (
    <Logo
      to={DASHBOARD_ROUTES.home.to}
      size={sidebarState === SidebarState.COLLAPSED_SIDEBAR ? 'small' : 'large'}
      inverted
    />
  );
};
