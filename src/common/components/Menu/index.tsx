import { useMemo } from 'react';
import { Menu as MenuOrig, type MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';

import { getSelectedKeys } from 'common/routerUtils';

type Props = MenuProps & {
  items: Required<MenuProps>['items'];
};

const Menu = (props: Props) => {
  const { pathname } = useLocation();

  const selectedKeys = useMemo(
    () =>
      getSelectedKeys(
        props.items.map((i) => `${i?.key}`),
        pathname
      ),
    [props.items, pathname]
  );

  return <MenuOrig selectedKeys={selectedKeys} {...props} />;
};

export default Menu;
