import React, { ReactNode } from 'react';
import useReactRouter from 'use-react-router';
import { MenuProps } from 'antd/lib/menu';

import ResponsiveNavigation from 'packages/responsive-navigation';

import { Icon, Popover, Menu } from '../';

type Props = {
  children: ReactNode;
  trigger: ReactNode;
};

const Navbar = ({ children, trigger }: Props) => (
  <ResponsiveNavigation>
    {({ isMobile, isNavigationVisible, hideNavigation, showNavigation }) =>
      isMobile ? (
        <Popover
          content={<EnhancedMenu isMobile>{children}</EnhancedMenu>}
          title={<Icon type="close" onClick={hideNavigation} />}
          trigger="click"
          visible={isNavigationVisible}
          onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
        >
          {trigger}
        </Popover>
      ) : (
        <EnhancedMenu>{children}</EnhancedMenu>
      )
    }
  </ResponsiveNavigation>
);

Navbar.defaultProps = {
  trigger: <Icon type="bars" style={{ color: '#fff' }} />,
};

Navbar.MenuItem = Menu.Item;

export default Navbar;

type EnhancedMenuProps = MenuProps & {
  children: ReactNode;
  isMobile?: boolean;
};

const EnhancedMenu = ({ children, isMobile, ...props }: EnhancedMenuProps) => {
  const {
    location: { pathname },
  } = useReactRouter();

  return (
    <Menu
      theme={isMobile ? undefined : 'dark'}
      {...props}
      mode={isMobile ? 'inline' : 'horizontal'}
      selectedKeys={[pathname]}
    >
      {children}
    </Menu>
  );
};
