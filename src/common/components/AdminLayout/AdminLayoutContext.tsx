import { createContext, useContext, useMemo } from 'react';
import { type SiderProps } from 'antd';

export enum SidebarState {
  OPEN_SIDEBAR = 'openSidebar',
  COLLAPSED_SIDEBAR = 'collapsedSidebar',
  OPEN_DRAWER = 'openDrawer',
  CLOSED_DRAWER = 'closedDrawer',
}

type AdminLayoutContextProps = {
  sidebarTheme: SiderProps['theme'];
  isCollapsed: boolean;
  isDrawerVisible: boolean;
  useDrawer: boolean;
  sidebarState: SidebarState;
  toggle: VoidFunction;
};

const AdminLayoutContext = createContext<AdminLayoutContextProps | undefined>(undefined);

export default AdminLayoutContext;

export const useAdminLayoutContext = () => {
  const ctx = useContext(AdminLayoutContext);

  if (ctx === undefined) {
    throw new Error('AdminLayoutContext has not been set, value is undefined');
  }

  return useMemo(() => ctx, [ctx]);
};
