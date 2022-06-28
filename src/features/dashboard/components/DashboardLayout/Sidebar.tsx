import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { SidebarMenu } from 'common/components/AdminLayout';

import { DASHBOARD_ROUTES } from '../../routes';

const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () =>
      [
        {
          to: DASHBOARD_ROUTES.home.to,
          label: t('dashboardLayout.sidebar.home', { defaultValue: 'Home' }),
          icon: <HomeOutlined />,
        },
      ].map(({ to, label, icon }) => ({
        key: to,
        label: <Link to={to}>{label}</Link>,
        icon,
      })),
    [t]
  );

  return <SidebarMenu items={menuItems} />;
};

export default Sidebar;
