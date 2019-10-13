import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MenuProps } from 'antd/lib/menu';

import ResponsiveNavigation from 'packages/responsive-navigation';

import { Icon, Popover, Menu } from '../';

type Props = {
  children: ReactNode;
};

const Navbar = ({ children }: Props) => (
  <ResponsiveNavigation>
    {({ isMobile, isNavigationVisible, hideNavigation, showNavigation }) =>
      isMobile ? (
        <Popover
          content={<EnhancedMenu isMobile>{children}</EnhancedMenu>}
          overlayClassName="navbar-popover"
          title={<Icon type="close" onClick={hideNavigation} />}
          trigger="click"
          visible={isNavigationVisible}
          onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
        >
          <span className="navbar-trigger">
            <Icon type="bars" />
          </span>
        </Popover>
      ) : (
        <EnhancedMenu>{children}</EnhancedMenu>
      )
    }
  </ResponsiveNavigation>
);

Navbar.MenuItem = Menu.Item;

export default Navbar;

type EnhancedMenuProps = MenuProps & {
  children: ReactNode;
  isMobile?: boolean;
};

const EnhancedMenu = ({ children, isMobile, ...props }: EnhancedMenuProps) => {
  const { pathname } = useLocation();

  return (
    <Menu
      theme={isMobile ? undefined : 'dark'}
      {...props}
      className={isMobile ? 'navbar-popover-menu' : 'navbar-menu'}
      mode={isMobile ? 'inline' : 'horizontal'}
      selectedKeys={[pathname]}
    >
      {children}
    </Menu>
  );
};
