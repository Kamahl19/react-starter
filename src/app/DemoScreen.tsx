import React, { useContext, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

import { selectUser } from 'common/services/auth';
import IsLoggedIn from 'common/services/auth/guards/IsLoggedIn';
import { Widget } from 'common/components';
import {
  AdminLayout,
  AdminLayoutContext,
  SidebarMenu,
  SidebarState,
} from 'common/components/AdminLayout';
import { AUTH_ROUTER_PATHS } from 'features/auth/routes';

import { RootState } from './store';

/**
 * Throw-away component
 * This is just for demo purposes
 */

const mapStateToProps = (state: RootState) => ({
  user: selectUser(state),
});

type Props = ReturnType<typeof mapStateToProps>;

const DemoScreen = ({ user }: Props) => (
  <AdminLayout
    logo={<Logo />}
    headerContent={
      <div style={{ flex: 1, textAlign: 'right', paddingRight: 22 }}>
        <Link to={AUTH_ROUTER_PATHS.logout}>Logout</Link>
      </div>
    }
    sidebarContent={<Sidebar />}
  >
    <Widget title="My profile" style={{ maxWidth: 400 }}>
      {user && (
        <>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </Widget>
  </AdminLayout>
);

export default connect(mapStateToProps)(IsLoggedIn(DemoScreen));

const Logo = () => {
  const { sidebarState } = useContext(AdminLayoutContext);

  return (
    <h1
      style={{
        color: sidebarState === SidebarState.CLOSED_DRAWER ? 'black' : 'white',
        margin: 0,
        padding: sidebarState === SidebarState.CLOSED_DRAWER ? '0 20px' : '20px 0',
        textAlign: 'center',
      }}
    >
      Logo
    </h1>
  );
};

const Sidebar = () => {
  const { pathname } = useLocation();
  const { toggle, sidebarState } = useContext(AdminLayoutContext);

  const onClick = useCallback(
    () => (sidebarState === SidebarState.OPEN_DRAWER ? toggle() : undefined),
    [sidebarState, toggle]
  );

  return (
    <SidebarMenu onClick={onClick} selectedKeys={[pathname]}>
      <SidebarMenu.Item key="/">
        <Link to="/">
          <HomeOutlined /> Home
        </Link>
      </SidebarMenu.Item>
    </SidebarMenu>
  );
};
