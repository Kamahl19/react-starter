import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveNavMenu from '../../../packages/responsive-nav-menu';

import { Layout } from '../';

const Header = ({ children }) => (
  <Layout.Header>
    <ResponsiveNavMenu>{children}</ResponsiveNavMenu>
  </Layout.Header>
);

Header.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Header;
