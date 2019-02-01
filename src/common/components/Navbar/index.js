import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
import Menu from 'antd/lib/menu';

import ResponsiveMenu from './ResponsiveMenu';

const MOBILE_MAX_WIDTH = 767;

const Navbar = ({ activePathname, children, history }) => (
  <MediaQuery maxWidth={MOBILE_MAX_WIDTH}>
    {isMobile =>
      isMobile ? (
        <ResponsiveMenu selectedKeys={[activePathname]} history={history}>
          {children({ isMobile })}
        </ResponsiveMenu>
      ) : (
        <Menu mode="horizontal" theme="dark" selectedKeys={[activePathname]}>
          {children({ isMobile })}
        </Menu>
      )
    }
  </MediaQuery>
);

Navbar.propTypes = {
  activePathname: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default Navbar;
