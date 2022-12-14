import { useCallback } from 'react';
import { type MenuProps } from 'antd';

import { Menu } from 'common/components';

import { SidebarState, useAdminLayoutContext } from './AdminLayoutContext';

type Props = MenuProps & {
  items: Required<MenuProps>['items'];
};

const SidebarMenu = ({ onClick, items, ...props }: Props) => {
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
    [onClick, toggle, sidebarState]
  );

  return <Menu mode="inline" theme="dark" onClick={menuOnClick} items={items} {...props} />;
};

export default SidebarMenu;
