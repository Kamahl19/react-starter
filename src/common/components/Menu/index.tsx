import { useMemo } from 'react';
import { Menu as MenuOrig, type MenuProps } from 'antd';
import type {
  MenuItemType,
  SubMenuType,
  MenuItemGroupType,
  MenuDividerType,
} from 'antd/es/menu/hooks/useItems';
import { useLocation } from 'react-router-dom';

import { getSelectedKeys } from 'common/routerUtils';

type ItemType =
  | MenuItemType
  | MenuDividerType
  | (Omit<SubMenuType, 'children'> & { children: ItemType[] })
  | (Omit<MenuItemGroupType, 'children'> & { children?: ItemType[] })
  | null
  | false;

type ItemTypeDefined =
  | MenuItemType
  | MenuDividerType
  | (Omit<SubMenuType, 'children'> & { children: ItemTypeDefined[] })
  | (Omit<MenuItemGroupType, 'children'> & { children?: ItemTypeDefined[] });

export type Props = Omit<MenuProps, 'items'> & {
  items: ItemType[];
};

const Menu = (props: Props) => {
  const { pathname } = useLocation();

  const menuProps = useMemo(() => createMenuProps(props, pathname), [props, pathname]);

  return <MenuOrig {...menuProps} />;
};

export default Menu;

export const createMenuProps = ({ items, ...props }: Props, pathname: string) => {
  const filteredItems = filterItems(items);

  return {
    ...props,
    items: filteredItems,
    selectedKeys: getSelectedKeys(
      flattenItems(filteredItems).map(({ key }) => String(key)),
      pathname
    ),
  };
};

const isDefined = (i: ItemType): i is ItemTypeDefined => i !== false && i !== null;

const filterItems = (arr: ItemType[]) => {
  const filtered: ItemTypeDefined[] = [];

  for (const item of arr) {
    if (isDefined(item)) {
      if ('children' in item && item.children) {
        filtered.push({ ...item, children: filterItems(item.children) });
      } else {
        filtered.push(item);
      }
    }
  }

  return filtered;
};

const flattenItems = (items: ItemTypeDefined[]) => {
  const flatItems: ItemTypeDefined[] = [];

  for (const item of items) {
    if ('children' in item && item.children?.length) {
      flatItems.push(...flattenItems(item.children));
    } else {
      flatItems.push(item);
    }
  }

  return flatItems;
};
