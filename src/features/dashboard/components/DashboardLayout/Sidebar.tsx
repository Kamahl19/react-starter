import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
      },
      {
        key: DASHBOARD_ROUTES.bookshelfReadingList.to,
        label: (
          <Link to={DASHBOARD_ROUTES.bookshelfReadingList.to}>
            {t('dashboard:sidebarMenu.bookshelf.readingList')}
          </Link>
        ),
      },
      {
        key: DASHBOARD_ROUTES.bookshelfFinished.to,
        label: (
          <Link to={DASHBOARD_ROUTES.bookshelfFinished.to}>
            {t('dashboard:sidebarMenu.bookshelf.finished')}
          </Link>
        ),
      },
      {
        key: '/app/404',
        label: <Link to="404">404</Link>,
      },
    ],
    [t],
  );

  return (
    <ul>
      {menuItems.map((item) => (
        <li key={item.key}>{item.label}</li>
      ))}
    </ul>
  );
};

export default Sidebar;
