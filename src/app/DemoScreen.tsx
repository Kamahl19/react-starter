import { connect } from 'react-redux';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

import { selectUser } from 'common/services/auth';
import IsLoggedIn from 'common/services/auth/guards/IsLoggedIn';
import { Widget } from 'common/components';
import { AdminLayout, SidebarMenu } from 'common/components/AdminLayout';
import { AUTH_ROUTER_PATHS } from 'features/auth/constants';

import { rootPath } from 'config';
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
      <div style={{ flex: 1, textAlign: 'right', paddingRight: 24 }}>
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

const Logo = () => (
  <h1 style={{ color: 'white', margin: 0, padding: '20px 0', textAlign: 'center' }}>Logo</h1>
);

function useSelectedKeys() {
  const { pathname } = useLocation();
  const matchRootPath = useRouteMatch(rootPath);

  if (matchRootPath) {
    return [rootPath];
  }

  return [pathname];
}

const Sidebar = () => (
  <SidebarMenu selectedKeys={useSelectedKeys()}>
    <SidebarMenu.Item key={rootPath} icon={<HomeOutlined />}>
      <Link to={rootPath}>Home</Link>
    </SidebarMenu.Item>
  </SidebarMenu>
);
