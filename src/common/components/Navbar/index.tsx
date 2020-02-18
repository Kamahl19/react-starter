import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Popover, Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';

import ResponsiveNavigation from 'packages/responsive-navigation';

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
          title={<CloseOutlined onClick={hideNavigation} />}
          trigger="click"
          visible={isNavigationVisible}
          onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
        >
          <span className="navbar-trigger">
            <MenuOutlined />
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
      {...props}
      className={isMobile ? 'navbar-popover-menu' : 'navbar-menu'}
      mode={isMobile ? 'inline' : 'horizontal'}
      selectedKeys={[pathname]}
    >
      {children}
    </Menu>
  );
};
