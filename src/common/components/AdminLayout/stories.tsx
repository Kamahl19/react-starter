import { useContext, ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import { DashboardOutlined, UserOutlined, LineChartOutlined } from '@ant-design/icons';

import { AdminLayout, AdminLayoutContext, SidebarMenu, SidebarState } from './';

export default {
  title: 'common/AdminLayout',
  component: AdminLayout,
} as Meta;

export const Basic: Story<ComponentProps<typeof AdminLayout>> = (args) => (
  <AdminLayout
    children={<MainContent />}
    logo={<Logo />}
    headerContent={<HeaderContent />}
    sidebarContent={<SidebarContent />}
    {...args}
  />
);

function HeaderContent() {
  return <div style={{ flex: 1, textAlign: 'right', paddingRight: 22 }}>Header content</div>;
}

function SidebarContent() {
  const { SubMenu, Item } = SidebarMenu;

  return (
    <SidebarMenu defaultSelectedKeys={['1']}>
      <Item key="1" icon={<DashboardOutlined />}>
        Dashboard
      </Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
        <Item key="2" icon={<LineChartOutlined />}>
          Option 1
        </Item>
        <Item key="3" icon={<LineChartOutlined />}>
          Option 2
        </Item>
        <Item key="4" icon={<LineChartOutlined />}>
          Option 3
        </Item>
      </SubMenu>
    </SidebarMenu>
  );
}

function MainContent() {
  const { toggle } = useContext(AdminLayoutContext);

  return (
    <>
      <button onClick={toggle}>Custom Toggle</button>
      <br />
      Content
    </>
  );
}

function Logo() {
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
}
