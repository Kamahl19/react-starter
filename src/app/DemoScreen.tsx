import React, { useContext, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { AdminLayout, AdminLayoutContext, SidebarMenu, SidebarState } from 'packages/admin-layout';

import { selectUser } from 'common/services/user';
import { Icon, Widget } from 'common/components';
import { AUTH_ROUTER_PATHS } from 'features/auth/constants';
import IsLoggedIn from 'features/auth/guards/IsLoggedIn';

import { RootState } from './store';

/**
 * Throw-away component
 * This is just for demo purposes
 */

const mapStateToProps = (state: RootState) => ({
  user: selectUser(state),
});

type Props = ReturnType<typeof mapStateToProps>;

const DemoScreen = IsLoggedIn(({ user }: Props) => (
  <AdminLayout
    logo={<Logo />}
    headerContent={
      <div style={{ flex: 1, textAlign: 'right', paddingRight: 22 }}>
        <Link to={AUTH_ROUTER_PATHS.logout}>Logout</Link>
      </div>
    }
    sidebarContent={<Sidebar />}
  >
    <Widget title="My profile" extra={<a href="/">More</a>} style={{ maxWidth: 400 }}>
      {user && (
        <>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </>
      )}
    </Widget>
  </AdminLayout>
));

export default connect(mapStateToProps)(DemoScreen);

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
          <Icon type="home" /> Home
        </Link>
      </SidebarMenu.Item>
    </SidebarMenu>
  );
};
