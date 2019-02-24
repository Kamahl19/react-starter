import React from 'react';
import PropTypes from 'prop-types';
import { Trans } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Layout, Navbar } from '../../../../common/components';

import { AUTH_ROUTER_PATHS } from '../../constants';

const PageLayout = ({ children }) => (
  <Layout>
    <Layout.Header>
      <Navbar>
        <Navbar.Menu>
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
        </Navbar.Menu>
      </Navbar>
    </Layout.Header>
    <Layout.Content>{children}</Layout.Content>
    <Layout.Footer>
      <Trans i18nKey="footer.copyright">Copyright</Trans>
    </Layout.Footer>
  </Layout>
);

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
