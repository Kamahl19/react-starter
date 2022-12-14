import { type ReactNode, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Dropdown, Space, type MenuProps } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { getSelectedKeys } from 'common/routerUtils';
import { useAuth } from 'common/auth';

import { DASHBOARD_ROUTES } from '../../routes';

type Props = {
  email: string;
};

const Header = ({ email }: Props) => {
  const { t } = useTranslation();

  const { logout } = useAuth();

  const items = useMemo(
    () => [
      {
        key: DASHBOARD_ROUTES.profile.to,
        label: <Link to={DASHBOARD_ROUTES.profile.to}>{t('dashboard:topMenu.profile')}</Link>,
        icon: <UserOutlined />,
      },
      {
        type: 'divider',
        key: 'divider1',
      },
      {
        key: 'logout',
        label: (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/no-static-element-interactions
          <a onClick={logout}>{t('dashboard:topMenu.logout')}</a>
        ),
        icon: <LogoutOutlined />,
      },
    ],
    [t, logout]
  );

  const { pathname } = useLocation();

  const selectedKeys = useMemo(
    () =>
      getSelectedKeys(
        items.map((i) => String(i.key)),
        pathname
      ),
    [items, pathname]
  );

  return (
    <div className="dashboard-layout-header">
      <div className="dashboard-layout-header-left" />
      <Space size="large">
        <HeaderDropdown menu={{ items, selectedKeys }}>
          <Avatar size="small" icon={<UserOutlined />} /> {email}
        </HeaderDropdown>
      </Space>
    </div>
  );
};

export default Header;

type HeaderDropdownProps = {
  children: ReactNode;
  menu: MenuProps;
};

const HeaderDropdown = ({ children, menu }: HeaderDropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const menuProps = useMemo(
    () => ({
      ...menu,
      onClick: () => setIsVisible(false),
    }),
    [menu]
  );

  return (
    <Dropdown
      className="dashboard-layout-header-dropdown"
      onOpenChange={setIsVisible}
      open={isVisible}
      trigger={['click']}
      menu={menuProps}
      overlayClassName="dashboard-layout-header-dropdown-container"
    >
      <div>
        {children} <DownOutlined />
      </div>
    </Dropdown>
  );
};
