import React, { useContext } from 'react';
import {
  DashboardOutlined,
  UserOutlined,
  EditOutlined,
  LineChartOutlined,
} from '@ant-design/icons';

import { AdminLayout, AdminLayoutContext, SidebarMenu, SidebarState } from './';
const { SubMenu, Item } = SidebarMenu;

export default {
  title: 'packages/AdminLayout',
};

const HeaderContent = () => (
  <div style={{ flex: 1, textAlign: 'right', paddingRight: 22 }}>Header content</div>
);

const SidebarContent = ({ long }: { long?: boolean }) => (
  <SidebarMenu defaultSelectedKeys={['1']}>
    <Item key="1">
      <DashboardOutlined />
      Dashboard
    </Item>
    <SubMenu
      key="sub1"
      title={
        <>
          <UserOutlined />
          Users
        </>
      }
    >
      <Item key="2">
        <LineChartOutlined />
        Option 1
      </Item>
      <Item key="3">
        <LineChartOutlined />
        Option 2
      </Item>
      <Item key="4">
        <LineChartOutlined />
        Option 3
      </Item>
    </SubMenu>
    <SubMenu
      key="sub2"
      title={
        <>
          <EditOutlined />
          Posts
        </>
      }
    >
      <Item key="5">
        <LineChartOutlined />
        Option 1
      </Item>
      <Item key="6">
        <LineChartOutlined />
        Option 2
      </Item>
      <SubMenu
        key="sub3"
        title={
          <>
            <LineChartOutlined /> Submenu
          </>
        }
      >
        <Item key="7">
          <LineChartOutlined />
          Option 3
        </Item>
        <Item key="8">
          <LineChartOutlined />
          Option 4
        </Item>
      </SubMenu>
    </SubMenu>
    {long && Array.from(Array(30)).map((_, idx) => <Item key={`long${idx}`}>Option {12 + 1}</Item>)}
  </SidebarMenu>
);

const MainContent = ({ long }: { long?: boolean }) => {
  const { toggle } = useContext(AdminLayoutContext);

  return long ? (
    <>
      Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very Very
      Very Very Very Very Very Very Very Very Very Very Very
      {Array.from(Array(30)).map((_, idx) => (
        <br key={idx} />
      ))}
      Long
      {Array.from(Array(30)).map((_, idx) => (
        <br key={idx} />
      ))}
      Content
      {Array.from(Array(30)).map((_, idx) => (
        <br key={idx} />
      ))}
    </>
  ) : (
    <>
      <button onClick={toggle}>Custom Toggle</button>
      <br />
      Content
    </>
  );
};

const Logo = () => {
  const { sidebarTheme, sidebarState } = useContext(AdminLayoutContext);

  const small = sidebarState === SidebarState.CLOSED_DRAWER;
  const light = sidebarTheme === 'dark' && sidebarState !== SidebarState.CLOSED_DRAWER;

  return (
    <div
      style={{
        padding: small ? '16px 0 16px 16px' : 16,
      }}
    >
      <div
        style={{
          height: 32,
          width: small ? 32 : 'auto',
          color: light ? 'black' : 'white',
          background: light ? 'white' : 'black',
        }}
      />
    </div>
  );
};

export const Basic = () => (
  <AdminLayout
    logo={<Logo />}
    headerContent={<HeaderContent />}
    sidebarContent={<SidebarContent />}
  >
    <MainContent />
  </AdminLayout>
);

export const LongContent = () => (
  <AdminLayout
    logo={<Logo />}
    headerContent={<HeaderContent />}
    sidebarContent={<SidebarContent long />}
  >
    <MainContent long />
  </AdminLayout>
);

export const CustomizedSidebar = () => (
  <AdminLayout
    logo={<Logo />}
    headerContent={<HeaderContent />}
    sidebarContent={<SidebarContent />}
    sidebarBreakpoint="lg"
    sidebarCollapsedWidth={120}
    sidebarWidth={300}
    sidebarTheme="light"
  >
    <MainContent />
  </AdminLayout>
);
