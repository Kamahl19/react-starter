import { useMemo } from 'react';
import { Menu as MenuOrig, type MenuProps } from 'antd';
import type {
  MenuItemType,
  SubMenuType,
  MenuItemGroupType,
  MenuDividerType,
} from 'antd/es/menu/hooks/useItems';
import { matchPath, useLocation } from 'react-router-dom';

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

const Menu = (props: Props) => <MenuOrig {...useCreateMenuProps(props)} />;

export default Menu;

export const useCreateMenuProps = (props: Props) => {
  const { pathname } = useLocation();

  const items = useMemo(() => filterItems(props.items), [props.items]);

  const selectedKeys = useMemo(
    () => getKeys(items).filter((path) => matchPath({ path, end: false }, pathname)),
    [items, pathname],
  );

  return useMemo(
    () => ({
      ...props,
      items,
      selectedKeys,
    }),
    [props, items, selectedKeys],
  );
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

const getKeys = (items: ItemTypeDefined[]) => {
  const keys: string[] = [];

  for (const item of items) {
    if ('children' in item && item.children?.length) {
      keys.push(...getKeys(item.children));
    } else {
      keys.push(String(item.key));
    }
  }

  return keys;
};
