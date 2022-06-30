import { useContext, useCallback } from 'react';
import { type MenuProps } from 'antd';
import { type MenuClickEventHandler } from 'rc-menu/lib/interface';

import { Menu } from 'common/components';

import AdminLayoutContext, { SidebarState } from './AdminLayoutContext';

type Props = MenuProps & {
  items: Required<MenuProps>['items'];
};

const SidebarMenu = ({ onClick, items, ...props }: Props) => {
  const { sidebarTheme, toggle, sidebarState } = useContext(AdminLayoutContext);

  const menuOnClick = useCallback<MenuClickEventHandler>(
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

  return <Menu mode="inline" theme={sidebarTheme} onClick={menuOnClick} items={items} {...props} />;
};

export default SidebarMenu;
