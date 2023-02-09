import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, StopOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { SidebarMenu } from 'common/components/AdminLayout';

import { DASHBOARD_ROUTES } from '../../routes';

const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      {
        key: DASHBOARD_ROUTES.home.to,
        label: <Link to={DASHBOARD_ROUTES.home.to}>{t('dashboard:sidebarMenu.home')}</Link>,
        icon: <HomeOutlined />,
      },
      {
        key: '/app/404',
        label: <Link to="404">404</Link>,
        icon: <StopOutlined />,
      },
    ],
    [t]
  );

  return <SidebarMenu items={menuItems} />;
};

export default Sidebar;
