import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';

import { Logo, StickyHeader } from '@/common/components';

import { DASHBOARD_ROUTES } from '../../routes';
import UserDropdown from './UserDropdown';

type Props = {
  userEmail: string;
};

const Header = ({ userEmail }: Props) => {
  const { t } = useTranslation();

  const { pathname } = useLocation();

  const items = useMemo(
    () =>
      [
        { to: DASHBOARD_ROUTES.bookshelfDiscover.to, label: t('dashboard:header.discover') },
        { to: DASHBOARD_ROUTES.bookshelfReadingList.to, label: t('dashboard:header.readingList') },
        { to: DASHBOARD_ROUTES.bookshelfFinished.to, label: t('dashboard:header.finished') },
      ].map((item) => ({
        ...item,
        isActive: !!matchPath({ path: item.to, end: false }, pathname),
      })),
    [t, pathname],
  );

  return (
    <StickyHeader
      logo={<Logo to={DASHBOARD_ROUTES.index.to} />}
      drawer={
        <StickyHeader.Drawer headerSlot={<Logo to={DASHBOARD_ROUTES.index.to} />} items={items} />
      }
      middleSlot={<StickyHeader.Nav items={items} />}
      endSlot={<UserDropdown email={userEmail} />}
    />
  );
};

export default Header;
