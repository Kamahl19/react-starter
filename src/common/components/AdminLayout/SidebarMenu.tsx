import { ReactNode, useContext, useCallback } from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd/lib/menu';
import cn from 'classnames';

import AdminLayoutContext, { SidebarState } from './AdminLayoutContext';

interface SidebarMenuProps extends MenuProps {
  children: ReactNode;
}

const SidebarMenu = ({ className, onClick, ...props }: SidebarMenuProps) => {
  const { sidebarTheme, isCollapsed, toggle, sidebarState } = useContext(AdminLayoutContext);

  const menuOnClick: SidebarMenuProps['onClick'] = useCallback(
    (info) => {
      if (onClick) {
        onClick(info);
      }

      if (sidebarState === SidebarState.OPEN_DRAWER) {
        toggle();
      }
    },
    [onClick, toggle, sidebarState]
  );

  return (
    <Menu
      className={cn('admin-layout-sidebar-menu', className)}
      mode={isCollapsed ? 'vertical' : 'inline'}
      theme={sidebarTheme}
      onClick={menuOnClick}
      {...props}
    />
  );
};

SidebarMenu.Divider = Menu.Divider;
SidebarMenu.Item = Menu.Item;
SidebarMenu.SubMenu = Menu.SubMenu;
SidebarMenu.ItemGroup = Menu.ItemGroup;

export default SidebarMenu;
