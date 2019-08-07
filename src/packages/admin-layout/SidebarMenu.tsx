import React, { ReactNode, useContext } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import cn from 'classnames';

import AdminLayoutContext from './AdminLayoutContext';

interface SidebarMenuProps extends MenuProps {
  children: ReactNode;
}

const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => {
  const { sidebarTheme, isCollapsed } = useContext(AdminLayoutContext);

  return (
    <Menu
      className={cn('admin-layout-sidebar-menu', className)}
      mode={isCollapsed ? 'vertical' : 'inline'}
      theme={sidebarTheme}
      {...props}
    />
  );
};

SidebarMenu.Divider = Menu.Divider;
SidebarMenu.Item = Menu.Item;
SidebarMenu.SubMenu = Menu.SubMenu;
SidebarMenu.ItemGroup = Menu.ItemGroup;

export default SidebarMenu;
