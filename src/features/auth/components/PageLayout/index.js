import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Layout, Header, Footer, Menu } from '../../../../common/components';

const PageLayout = ({ children }) => (
  <Layout>
    <Header>
      {() => [
        <Menu.Item key="signup">
          <Link to="/sign-up">
            <Trans i18nKey="nav.signup">Sign Up</Trans>
          </Link>
        </Menu.Item>,
        <Menu.Item key="login">
          <Link to="/login">
            <Trans i18nKey="nav.login">Log In</Trans>
          </Link>
        </Menu.Item>,
      ]}
    </Header>
    <Layout.Content>{children}</Layout.Content>
    <Footer />
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
