import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOutlined, StopOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { SidebarMenu } from '@/common/components/AdminLayout';

import { DASHBOARD_ROUTES } from '../../routes';

const Sidebar = () => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      {
        key: DASHBOARD_ROUTES.bookshelfDiscover.to,
        label: (
          <Link to={DASHBOARD_ROUTES.bookshelfDiscover.to}>
            {t('dashboard:sidebarMenu.bookshelf.discover')}
          </Link>
        ),
        icon: <BookOutlined />,
      },
      {
        key: DASHBOARD_ROUTES.bookshelfReadingList.to,
        label: (
          <Link to={DASHBOARD_ROUTES.bookshelfReadingList.to}>
            {t('dashboard:sidebarMenu.bookshelf.readingList')}
          </Link>
        ),
        icon: <BookOutlined />,
      },
      {
        key: DASHBOARD_ROUTES.bookshelfFinished.to,
        label: (
          <Link to={DASHBOARD_ROUTES.bookshelfFinished.to}>
            {t('dashboard:sidebarMenu.bookshelf.finished')}
          </Link>
        ),
        icon: <BookOutlined />,
      },
      {
        key: '/app/404',
        label: <Link to="404">404</Link>,
        icon: <StopOutlined />,
      },
    ],
    [t],
  );

  return <SidebarMenu items={menuItems} />;
};

export default Sidebar;
