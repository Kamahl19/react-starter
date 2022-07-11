import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { Navbar, Logo } from 'common/components';

import { AUTH_ROUTES } from '../../routes';

const AuthLayout = () => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () =>
      [
        {
          to: AUTH_ROUTES.login.to,
          label: t('authLayout.menu.login'),
        },
        {
          to: AUTH_ROUTES.signUp.to,
          label: t('authLayout.menu.signUp'),
        },
      ].map(({ to, label }) => ({
        key: to,
        label: <Link to={to}>{label}</Link>,
      })),
    [t]
  );

  return (
    <Layout className="auth-layout">
      <Layout.Header>
        <Logo to={AUTH_ROUTES.login.to} size="large" />
        <Navbar items={menuItems} />
      </Layout.Header>
      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default AuthLayout;
