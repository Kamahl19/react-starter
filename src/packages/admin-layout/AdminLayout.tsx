import React, { ReactNode, useState, useCallback } from 'react';
import { Layout, Icon, Drawer } from 'antd';
import { SiderProps } from 'antd/lib/layout/Sider';
import cn from 'classnames';
import { useMediaQuery } from 'react-responsive';

import AdminLayoutContext, { SidebarState } from './AdminLayoutContext';

const { Sider, Header, Content } = Layout;

const MAX_WIDTH_MAP = {
  xs: 575,
  sm: 767,
  md: 991,
  lg: 1199,
  xl: 1599,
  xxl: Infinity,
};

type AdminLayoutProps = {
  className?: string;
  logo?: ReactNode;
  children?: ReactNode;
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
  sidebarBreakpoint?: SiderProps['breakpoint'];
  sidebarCollapsedWidth?: SiderProps['collapsedWidth'];
  sidebarWidth?: SiderProps['width'];
  sidebarTheme?: SiderProps['theme'];
};

const AdminLayout = ({
  className,
  logo,
  children,
  headerContent,
  sidebarContent,
  sidebarBreakpoint = 'md',
  sidebarCollapsedWidth = 80,
  sidebarWidth = 256,
  sidebarTheme = 'dark',
}: AdminLayoutProps) => {
  const useDrawer = useMediaQuery({ maxWidth: MAX_WIDTH_MAP[sidebarBreakpoint] });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleIsCollapsed = useCallback(() => setIsCollapsed(!isCollapsed), [isCollapsed]);

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleIsDrawerVisible = useCallback(() => setIsDrawerVisible(!isDrawerVisible), [
    isDrawerVisible,
  ]);

  const toggle = useCallback(() => (useDrawer ? toggleIsDrawerVisible() : toggleIsCollapsed()), [
    useDrawer,
    toggleIsDrawerVisible,
    toggleIsCollapsed,
  ]);

  const sidebarState = getSidebarState({ useDrawer, isCollapsed, isDrawerVisible });

  const Sidebar = (
    <Sider
      className="admin-layout-sidebar"
      collapsible
      collapsed={useDrawer ? false : isCollapsed}
      collapsedWidth={sidebarCollapsedWidth}
      theme={sidebarTheme}
      trigger={null}
      width={sidebarWidth}
    >
      <div className="admin-layout-sidebar-logo">{logo}</div>
      {sidebarContent && <div className="admin-layout-sidebar-content">{sidebarContent}</div>}
    </Sider>
  );

  return (
    <AdminLayoutContext.Provider
      value={{ sidebarTheme, isCollapsed, useDrawer, isDrawerVisible, sidebarState, toggle }}
    >
      <Layout className={cn('admin-layout', className)}>
        {useDrawer ? (
          <Drawer
            className="admin-layout-drawer"
            closable={false}
            placement="left"
            visible={isDrawerVisible}
            width={sidebarWidth}
            onClose={toggleIsDrawerVisible}
          >
            {Sidebar}
          </Drawer>
        ) : (
          Sidebar
        )}
        <Layout className="admin-layout-main">
          <Header className="admin-layout-main-header">
            {useDrawer && logo}
            <span
              className="admin-layout-sidebar-trigger"
              onClick={useDrawer ? toggleIsDrawerVisible : toggleIsCollapsed}
            >
              <Icon
                type={`menu-${
                  (useDrawer && !isDrawerVisible) || (!useDrawer && isCollapsed) ? 'unfold' : 'fold'
                }`}
              />
            </span>
            {headerContent}
          </Header>
          <Content className="admin-layout-main-content">{children}</Content>
        </Layout>
      </Layout>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;

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
