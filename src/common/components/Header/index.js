import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveMenu from '../../../packages/responsive-menu';

import { Layout } from '../';

const Header = ({ children }) => (
  <Layout.Header>
    <ResponsiveMenu>{children}</ResponsiveMenu>
  </Layout.Header>
);

Header.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Header;
