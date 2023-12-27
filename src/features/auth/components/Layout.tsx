import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useAuth } from '@/common/auth';
import { LanguageSelector, ThemeSelector, Logo } from '@/common/components';

import { AUTH_ROUTES } from '../routes';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();

  const menuItems = useMemo(
    () =>
      isLoggedIn
        ? []
        : [
            {
              key: AUTH_ROUTES.signIn.to,
              label: <Link to={AUTH_ROUTES.signIn.to}>{t('auth:menu.signIn')}</Link>,
            },
            {
              key: AUTH_ROUTES.signUp.to,
              label: <Link to={AUTH_ROUTES.signUp.to}>{t('auth:menu.signUp')}</Link>,
            },
          ],
    [t, isLoggedIn],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
        }}
      >
        <div>
          <Link to={AUTH_ROUTES.signIn.to}>
            <Logo />
          </Link>
          <div>
            <LanguageSelector />
            <ThemeSelector />
            {menuItems.length > 0 && (
              <ul>
                {menuItems.map((item) => (
                  <li key={item.key}>{item.label}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
      <main
        style={{
          display: 'grid',
          height: '100%',
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
