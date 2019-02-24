import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

import ResponsiveNavigation from '../../../packages/responsive-navigation';

import { Icon, Popover, Menu } from '../';

const Navbar = ({ children }) => (
  <ResponsiveNavigation>
    {({ activePath, isMobile, hideNavigation, showNavigation, isNavigationVisible }) => {
      const Menu = cloneElement(children, { activePath, isMobile });

      return isMobile ? (
        <Popover
          content={Menu}
          onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
          title={<Icon type="close" onClick={hideNavigation} />}
          trigger="click"
          visible={isNavigationVisible}
        >
          <Icon type="bars" style={{ color: '#fff' }} />
        </Popover>
      ) : (
        Menu
      );
    }}
  </ResponsiveNavigation>
);

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
};

Navbar.Menu = ({ activePath, isMobile, ...props }) => (
  <Menu
    mode={isMobile ? 'inline' : 'horizontal'}
    selectedKeys={[activePath]}
    theme={isMobile ? undefined : 'dark'}
    {...props}
  />
);

Navbar.MenuItem = Menu.Item;

export default Navbar;
