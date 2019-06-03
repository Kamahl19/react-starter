import React, { ReactNode } from 'react';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Layout, Navbar } from 'common/components';

import { AUTH_ROUTER_PATHS } from '../../constants';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => (
  <Layout>
    <Layout.Header>
      <Navbar>
        <Navbar.MenuItem>
          <Link to={AUTH_ROUTER_PATHS.signUp}>
            <Trans i18nKey="nav.signup">Sign Up</Trans>
          </Link>
        </Navbar.MenuItem>
        <Navbar.MenuItem>
          <Link to={AUTH_ROUTER_PATHS.login}>
            <Trans i18nKey="nav.login">Log In</Trans>
          </Link>
        </Navbar.MenuItem>
      </Navbar>
    </Layout.Header>
    <Layout.Content>{children}</Layout.Content>
  </Layout>
);

export default PageLayout;
