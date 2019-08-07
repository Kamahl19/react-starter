import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Layout, Navbar } from 'common/components';

import { AUTH_ROUTER_PATHS } from '../../constants';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Layout.Header>
        <Navbar>
          <Navbar.MenuItem key={AUTH_ROUTER_PATHS.signUp}>
            <Link to={AUTH_ROUTER_PATHS.signUp}>
              {t('nav.signup', { defaultValue: 'Sign Up' })}
            </Link>
          </Navbar.MenuItem>
          <Navbar.MenuItem key={AUTH_ROUTER_PATHS.login}>
            <Link to={AUTH_ROUTER_PATHS.login}>{t('nav.login', { defaultValue: 'Log In' })}</Link>
          </Navbar.MenuItem>
        </Navbar>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default PageLayout;
