import React, { Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';

import ResponsiveNavigation from '../../../packages/responsive-navigation';

import { Icon, Popover, Menu } from '../';

const Navbar = ({ children, trigger }) => (
  <ResponsiveNavigation>
    {({ activePath, hideNavigation, isMobile, isNavigationVisible, showNavigation }) => {
      if (children.type !== Navbar.Menu || !isValidElement(Children.only(children))) {
        return null;
      }

      const Menu = cloneElement(children, { activePath, isMobile });

      return isMobile ? (
        <Popover
          content={Menu}
          title={<Icon type="close" onClick={hideNavigation} />}
          trigger="click"
          visible={isNavigationVisible}
          onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
        >
          {trigger}
        </Popover>
      ) : (
        Menu
      );
    }}
  </ResponsiveNavigation>
);

Navbar.propTypes = {
  children: PropTypes.node.isRequired,
  trigger: PropTypes.node.isRequired,
};

Navbar.defaultProps = {
  trigger: <Icon type="bars" style={{ color: '#fff' }} />,
};

Navbar.Menu = ({ activePath, isMobile, ...props }) => (
  <Menu
    theme={isMobile ? undefined : 'dark'}
    {...props}
    mode={isMobile ? 'inline' : 'horizontal'}
    selectedKeys={[activePath]}
  />
);

Navbar.MenuItem = Menu.Item;

export default Navbar;
