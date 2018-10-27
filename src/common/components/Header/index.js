import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import Layout from '../Layout';

import Nav from './Nav';

const Header = ({ children, history, location }) => (
  <Layout.Header>
    <div className="logo">
      <Link to="/">
        <Trans i18nKey="header.title">React Starter</Trans>
      </Link>
    </div>
    <Nav activePathname={location.pathname} history={history}>
      {children}
    </Nav>
  </Layout.Header>
);

Header.propTypes = {
  children: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Header);
