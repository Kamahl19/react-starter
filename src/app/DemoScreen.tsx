import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AdminLayout, AdminLayoutContext, SidebarState } from 'packages/admin-layout';

import { selectProfile } from 'common/services/user';
import { Widget } from 'common/components';
import { AUTH_ROUTER_PATHS } from 'features/auth/constants';
import IsLoggedIn from 'features/auth/guards/IsLoggedIn';

import { RootState } from './store';

/**
 * Throw-away component
 * This is just for demo purposes
 */

const mapStateToProps = (state: RootState) => ({
  profile: selectProfile(state),
});

type Props = ReturnType<typeof mapStateToProps>;

const DemoScreen = IsLoggedIn(({ profile }: Props) => (
  <AdminLayout
    logo={<Logo />}
    headerContent={
      <div style={{ flex: 1, textAlign: 'right', paddingRight: 22 }}>
        <Link to={AUTH_ROUTER_PATHS.logout}>Logout</Link>
      </div>
    }
  >
    <Widget title="My profile" extra={<a href="/">More</a>} style={{ maxWidth: 400 }}>
      {profile && (
        <>
          <p>ID: {profile.id}</p>
          <p>Email: {profile.email}</p>
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
