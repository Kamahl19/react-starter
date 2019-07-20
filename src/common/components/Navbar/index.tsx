import React, { ReactNode } from 'react';
import useReactRouter from 'use-react-router';

import ResponsiveNavigation from 'packages/responsive-navigation';
import { MenuProps } from 'antd/lib/menu';

import { Icon, Popover, Menu } from '../';

type Props = {
  children: ReactNode;
  trigger: ReactNode;
};

const Navbar = ({ children, trigger }: Props) => (
  <ResponsiveNavigation>
    {({ hideNavigation, isMobile, isNavigationVisible, showNavigation }) =>
      isMobile ? (
        <Popover
          content={<EnhancedMenu isMobile children={children} />}
          title={<Icon type="close" onClick={hideNavigation} />}
          trigger="click"
          visible={isNavigationVisible}
          onVisibleChange={visible => (visible ? showNavigation() : hideNavigation())}
        >
          {trigger}
        </Popover>
      ) : (
        <EnhancedMenu children={children} />
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
  const { location } = useReactRouter();

  return (
    <Menu
      theme={isMobile ? undefined : 'dark'}
      {...props}
      mode={isMobile ? 'inline' : 'horizontal'}
      selectedKeys={[location.pathname]}
    >
      {children}
    </Menu>
  );
};
