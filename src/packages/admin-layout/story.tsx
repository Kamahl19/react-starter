import React, { useContext } from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from 'antd';

import { AdminLayout, AdminLayoutContext, SidebarMenu, SidebarState } from './';
const { SubMenu, Item } = SidebarMenu;

storiesOf('packages/AdminLayout', module)
  .add('default', () => (
    <AdminLayout
      logo={<Logo />}
      headerContent={<HeaderContent />}
      sidebarContent={<SidebarContent />}
    >
      <MainContent />
    </AdminLayout>
  ))
  .add('long content', () => (
    <AdminLayout
      logo={<Logo />}
      headerContent={<HeaderContent />}
      sidebarContent={<SidebarContent long />}
    >
      <MainContent long />
    </AdminLayout>
  ))
  .add('customized sidebar', () => (
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
  ));

const HeaderContent = () => (
  <div style={{ flex: 1, textAlign: 'right', paddingRight: 22 }}>Header content</div>
);

const SidebarContent = ({ long }: { long?: boolean }) => (
  <SidebarMenu>
    <SubMenu
      key="sub1"
      title={
        <>
          <Icon type="mail" /> Navigation One
        </>
      }
    >
      <Item key="1">Option 1</Item>
      <Item key="2">Option 2</Item>
      <Item key="3">Option 3</Item>
      <Item key="4">Option 4</Item>
    </SubMenu>
    <SubMenu
      key="sub2"
      title={
        <>
          <Icon type="appstore" /> Navigation Two
        </>
      }
    >
      <Item key="5">Option 5</Item>
      <Item key="6">Option 6</Item>
      <SubMenu key="sub3" title="Submenu">
        <Item key="7">Option 7</Item>
        <Item key="8">Option 8</Item>
      </SubMenu>
    </SubMenu>
    <SubMenu
      key="sub4"
      title={
        <>
          <Icon type="setting" /> Navigation Three
        </>
      }
    >
      <Item key="9">Option 9</Item>
      <Item key="10">Option 10</Item>
      <Item key="11">Option 11</Item>
      <Item key="12">Option 12</Item>
    </SubMenu>
    {long &&
      Array.from(Array(30)).map((_, idx) => (
        <Item key={`long${idx}`}>
          <>
            <Icon type="setting" /> Option {12 + 1}
          </>{' '}
        </Item>
      ))}
  </SidebarMenu>
);

const MainContent = ({ long }: { long?: boolean }) =>
  long ? (
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
    <>Content</>
  );

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
