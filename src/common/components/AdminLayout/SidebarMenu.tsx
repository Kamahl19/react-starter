import { useCallback } from 'react';

import { Menu, type MenuProps } from '@/common/components';

import { SidebarState, useAdminLayoutContext } from './AdminLayoutContext';

const SidebarMenu = ({ onClick, items, ...props }: MenuProps) => {
  const { toggle, sidebarState } = useAdminLayoutContext();

  const menuOnClick = useCallback<Required<MenuProps>['onClick']>(
    (info) => {
      if (onClick) {
        onClick(info);
      }

      if (sidebarState === SidebarState.OPEN_DRAWER) {
        toggle();
      }
    },
    [onClick, toggle, sidebarState],
  );

  return <Menu mode="inline" onClick={menuOnClick} items={items} {...props} />;
};

export default SidebarMenu;
