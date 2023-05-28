import { createContext, useContext } from 'react';

export enum SidebarState {
  OPEN_SIDEBAR = 'openSidebar',
  COLLAPSED_SIDEBAR = 'collapsedSidebar',
  OPEN_DRAWER = 'openDrawer',
  CLOSED_DRAWER = 'closedDrawer',
}

type ContextValue = {
  isCollapsed: boolean;
  isDrawerVisible: boolean;
  useDrawer: boolean;
  sidebarState: SidebarState;
  toggle: VoidFunction;
};

const AdminLayoutContext = createContext<ContextValue | undefined>(undefined);

export default AdminLayoutContext;

export const useAdminLayoutContext = () => {
  const ctx = useContext(AdminLayoutContext);

  if (ctx === undefined) {
    throw new Error('AdminLayoutContext has not been set, value is undefined');
  }

  return ctx;
};
