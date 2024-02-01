import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { matchPath, useLocation } from 'react-router-dom';

import { rootPath } from '@/config';
import { useAuth } from '@/common/auth';
import { Logo, StickyHeader } from '@/common/components';

import { AUTH_ROUTES } from '../../routes';
import LanguageDropdown from './LanguageDropdown';
import ThemeDropdown from './ThemeDropdown';

const Header = () => {
  const { t } = useTranslation('auth');

  const { isLoggedIn } = useAuth();

  const { pathname } = useLocation();

  const items = useMemo(
    () =>
      (isLoggedIn
        ? []
        : [
            { to: AUTH_ROUTES.signIn.to, label: t('header.signIn') },
            { to: AUTH_ROUTES.signUp.to, label: t('header.signUp') },
          ]
      ).map((item) => ({
        ...item,
        isActive: !!matchPath({ path: item.to, end: false }, pathname),
      })),
    [t, isLoggedIn, pathname],
  );

  return (
    <StickyHeader
      logo={<Logo to={rootPath} />}
      drawer={<StickyHeader.Drawer headerSlot={<Logo to={rootPath} />} items={items} />}
      middleSlot={<StickyHeader.Nav items={items} />}
      endSlot={
        <>
          <LanguageDropdown />
          <ThemeDropdown />
        </>
      }
    />
  );
};

export default Header;
