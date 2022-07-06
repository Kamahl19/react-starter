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
          label: t('authLayout.login'),
        },
        {
          to: AUTH_ROUTES.signUp.to,
          label: t('authLayout.signUp'),
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
      {/* You can remove the Netlify link. It's here only to conform with Netlify's Open Source Plan Policy (https://www.netlify.com/legal/open-source-policy/) */}
      <Layout.Footer style={{ textAlign: 'center' }}>
        <a href="https://www.netlify.com">This site is powered by Netlify</a>
      </Layout.Footer>
    </Layout>
  );
};

export default AuthLayout;
