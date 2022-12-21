import { type ReactNode, useState, useCallback, useMemo } from 'react';
import { Layout, Drawer, Grid, type SiderProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import cn from 'classnames';

import AdminLayoutContext, { SidebarState, useAdminLayoutContext } from './AdminLayoutContext';

const { Sider, Header, Content } = Layout;

type AdminLayoutProps = {
  className?: string;
  logo?: ReactNode;
  smallLogo?: ReactNode;
  children?: ReactNode;
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
  sidebarBreakpoint?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  sidebarCollapsedWidth?: SiderProps['collapsedWidth'];
  sidebarWidth?: SiderProps['width'];
  sidebarTheme?: SiderProps['theme'];
};

const AdminLayout = ({
  className,
  logo,
  smallLogo,
  children,
  headerContent,
  sidebarContent,
  sidebarBreakpoint = 'lg',
  sidebarCollapsedWidth = 80,
  sidebarWidth = 256,
  sidebarTheme = 'dark',
}: AdminLayoutProps) => {
  const { [sidebarBreakpoint]: isBreakpoint } = Grid.useBreakpoint();

  const useDrawer = !isBreakpoint;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = useCallback(() => setIsCollapsed(!isCollapsed), [isCollapsed]);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleIsDrawerVisible = useCallback(
    () => setIsDrawerVisible(!isDrawerVisible),
    [isDrawerVisible]
  );

  const toggle = useCallback(
    () => (useDrawer ? toggleIsDrawerVisible() : toggleIsCollapsed()),
    [useDrawer, toggleIsDrawerVisible, toggleIsCollapsed]
  );

  const sidebarState = getSidebarState({ useDrawer, isCollapsed, isDrawerVisible });

  const value = useMemo(
    () => ({ sidebarTheme, isCollapsed, useDrawer, isDrawerVisible, sidebarState, toggle }),
    [sidebarTheme, isCollapsed, useDrawer, isDrawerVisible, sidebarState, toggle]
  );

  const sidebarProps = useMemo(
    () => ({
      logo,
      sidebarCollapsedWidth,
      sidebarContent,
      sidebarWidth,
      onCollapse: setIsCollapsed,
    }),
    [sidebarCollapsedWidth, sidebarWidth, logo, sidebarContent]
  );

  return (
    <AdminLayoutContext.Provider value={value}>
      <Layout className={cn('admin-layout', className)}>
        {useDrawer ? (
          <Drawer
            className="admin-layout-drawer"
            closable={false}
            placement="left"
            open={isDrawerVisible}
            width={sidebarWidth}
            onClose={toggleIsDrawerVisible}
          >
            <Sidebar {...sidebarProps} />
          </Drawer>
        ) : (
          <Sidebar {...sidebarProps} />
        )}
        <Layout className="admin-layout-main">
          <Header className="admin-layout-main-header">
            {useDrawer && (
              <>
                {smallLogo}
                {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                <span className="admin-layout-drawer-trigger" onClick={toggleIsDrawerVisible}>
                  <MenuOutlined />
                </span>
              </>
            )}
            {headerContent}
          </Header>
          <Content className="admin-layout-main-content">{children}</Content>
        </Layout>
      </Layout>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;

type SidebarProps = {
  logo?: ReactNode;
  sidebarCollapsedWidth?: SiderProps['collapsedWidth'];
  sidebarContent?: ReactNode;
  sidebarWidth?: SiderProps['width'];
  onCollapse: Required<SiderProps>['onCollapse'];
};

const Sidebar = ({
  logo,
  sidebarCollapsedWidth,
  sidebarContent,
  sidebarWidth,
  onCollapse,
}: SidebarProps) => {
  const { sidebarTheme, isCollapsed, useDrawer } = useAdminLayoutContext();

  return (
    <Sider
      className="admin-layout-sidebar"
      collapsible={!useDrawer}
      collapsed={isCollapsed && !useDrawer}
      onCollapse={onCollapse}
      collapsedWidth={sidebarCollapsedWidth}
      theme={sidebarTheme}
      width={sidebarWidth}
    >
      <div className="admin-layout-sidebar-logo">{logo}</div>
      {sidebarContent && <div className="admin-layout-sidebar-content">{sidebarContent}</div>}
    </Sider>
  );
};

const getSidebarState = ({
  useDrawer,
  isCollapsed,
  isDrawerVisible,
}: {
  useDrawer: boolean;
  isCollapsed: boolean;
  isDrawerVisible: boolean;
}) =>
  useDrawer
    ? isDrawerVisible
      ? SidebarState.OPEN_DRAWER
      : SidebarState.CLOSED_DRAWER
    : isCollapsed
    ? SidebarState.COLLAPSED_SIDEBAR
    : SidebarState.OPEN_SIDEBAR;
