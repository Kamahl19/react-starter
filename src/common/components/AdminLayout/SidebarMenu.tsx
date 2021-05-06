import { ReactNode, useContext, useCallback } from 'react';
import { Menu, MenuProps } from 'antd';

import AdminLayoutContext, { SidebarState } from './AdminLayoutContext';

interface SidebarMenuProps extends MenuProps {
  children: ReactNode;
}

const SidebarMenu = ({ onClick, ...props }: SidebarMenuProps) => {
  const { sidebarTheme, toggle, sidebarState } = useContext(AdminLayoutContext);

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

  return <Menu mode="inline" theme={sidebarTheme} onClick={menuOnClick} {...props} />;
};

SidebarMenu.Divider = Menu.Divider;
SidebarMenu.Item = Menu.Item;
SidebarMenu.SubMenu = Menu.SubMenu;
SidebarMenu.ItemGroup = Menu.ItemGroup;

export default SidebarMenu;
