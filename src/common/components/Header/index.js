import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveNavigation from '../../../packages/responsive-navigation';

import { Layout } from '../';

const Header = ({ children }) => (
  <Layout.Header>
    <ResponsiveNavigation>{children}</ResponsiveNavigation>
  </Layout.Header>
);

Header.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Header;
