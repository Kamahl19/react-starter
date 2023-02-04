import { useMemo } from 'react';
import { Menu as MenuOrig, type MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';

import { useIsDark } from 'app/theme';
import { getSelectedKeys } from 'common/routerUtils';

type Props = MenuProps & {
  items: Required<MenuProps>['items'];
};

const Menu = (props: Props) => {
  const isDark = useIsDark();

  const { pathname } = useLocation();

  const selectedKeys = useMemo(
    () =>
      getSelectedKeys(
        props.items.map((i) => String(i?.key)),
        pathname
      ),
    [props.items, pathname]
  );

  return <MenuOrig selectedKeys={selectedKeys} theme={isDark ? 'dark' : 'light'} {...props} />;
};

export default Menu;
