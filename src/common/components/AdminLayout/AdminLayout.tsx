import { type ReactNode, useState, useCallback, useMemo } from 'react';
import { Layout, Drawer, Row, Col, type SiderProps } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';

import {
  createStyles,
  fullVPHeightCss,
  getMQ,
  useBreakpoint,
  type Breakpoint,
} from 'common/styleUtils';
import AdminLayoutContext, { SidebarState, useAdminLayoutContext } from './AdminLayoutContext';

type Props = {
  className?: string;
  logo?: ReactNode;
  children?: ReactNode;
  headerContent?: ReactNode;
  sidebarContent?: ReactNode;
  sidebarBreakpoint?: Breakpoint;
  sidebarCollapsedWidth?: SiderProps['collapsedWidth'];
  sidebarWidth?: SiderProps['width'];
};

const AdminLayout = ({
  className,
  logo,
  children,
  headerContent,
  sidebarContent,
  sidebarBreakpoint = 'lg',
  sidebarCollapsedWidth = 80,
  sidebarWidth = 256,
}: Props) => {
  const { [sidebarBreakpoint]: isBreakpoint } = useBreakpoint();

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

  const sidebarState = useDrawer
    ? isDrawerVisible
      ? SidebarState.OPEN_DRAWER
      : SidebarState.CLOSED_DRAWER
    : isCollapsed
    ? SidebarState.COLLAPSED_SIDEBAR
    : SidebarState.OPEN_SIDEBAR;

  const value = useMemo(
    () => ({ isCollapsed, useDrawer, isDrawerVisible, sidebarState, toggle }),
    [isCollapsed, useDrawer, isDrawerVisible, sidebarState, toggle]
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
      <Layout className={className}>
        {useDrawer ? (
          <Drawer
            closable={false}
            placement="left"
            open={isDrawerVisible}
            width={sidebarWidth}
            css={styles.drawer}
            onClose={toggleIsDrawerVisible}
          >
            <Sidebar {...sidebarProps} />
          </Drawer>
        ) : (
          <Sidebar {...sidebarProps} />
        )}
        <Layout css={fullVPHeightCss}>
          <Layout.Header css={[styles.header, styles.shadowBottom]}>
            <Row justify="space-between" wrap={false}>
              <Col>
                {useDrawer && (
                  <>
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <div css={styles.drawerTrigger} onClick={toggleIsDrawerVisible}>
                      <MenuOutlined />
                    </div>
                  </>
                )}
              </Col>
              <Col>{headerContent}</Col>
            </Row>
          </Layout.Header>
          <Layout.Content css={styles.content}>{children}</Layout.Content>
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
  const { isCollapsed, useDrawer } = useAdminLayoutContext();

  return (
    <Layout.Sider
      css={[styles.sidebar, fullVPHeightCss]}
      collapsible={!useDrawer}
      collapsed={isCollapsed && !useDrawer}
      onCollapse={onCollapse}
      collapsedWidth={sidebarCollapsedWidth}
      width={sidebarWidth}
      theme="light"
    >
      <div css={[styles.sidebarLogo, styles.shadowBottom]}>{logo}</div>
      {sidebarContent && <div css={styles.sidebarContent}>{sidebarContent}</div>}
    </Layout.Sider>
  );
};

const styles = createStyles({
  shadowBottom: ({ token }) =>
    css({
      boxShadow: token.boxShadowTertiary,
      clipPath: 'inset(0 0 -7px 0)',
    }),

  header: ({ token }) =>
    css({
      zIndex: 19,

      '&&': {
        background: token.colorBgContainer,
        paddingInline: token.paddingLG,

        [getMQ(token).smMax]: {
          paddingInline: token.paddingSM,
        },
      },
    }),

  content: ({ token }) =>
    css({
      overflowY: 'auto',
      padding: token.paddingLG,

      [getMQ(token).smMax]: {
        padding: token.paddingSM,
      },
    }),

  sidebar: ({ token }) =>
    css({
      boxShadow: token.boxShadowTertiary,

      '.ant-layout-sider-children': {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      },
    }),

  sidebarLogo: ({ token }) =>
    css({
      flex: 'none',
      height: token.controlHeight * 2, // TODO use Layout.layoutHeaderHeight once it's exported from Ant
      display: 'grid',
      placeContent: 'center',
    }),

  sidebarContent: css({
    overflowY: 'auto',

    '&& .ant-menu-inline': {
      borderRight: 0,
    },
  }),

  drawerTrigger: ({ token }) =>
    css({
      paddingInline: token.paddingMD,
      textAlign: 'center',
      fontSize: 24,
    }),

  drawer: css({
    '.ant-drawer-body': {
      padding: 0,
    },
  }),
});
