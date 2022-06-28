import { type ReactNode, type ReactElement, useState, useMemo, cloneElement } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Space } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { Menu } from 'common/components';

import { DASHBOARD_ROUTES } from '../../routes';

type Props = {
  email: string;
  logout: VoidFunction;
};

const Header = ({ email, logout }: Props) => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      {
        key: DASHBOARD_ROUTES.profile.to,
        label: (
          <Link to={DASHBOARD_ROUTES.profile.to}>
            {t('dashboardLayout.header.profile', { defaultValue: 'Profile' })}
          </Link>
        ),
        icon: <UserOutlined />,
      },
      {
        type: 'divider',
        key: 'divider1',
      },
      {
        key: 'logout',
        label: (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={logout}>{t('dashboardLayout.header.logout', { defaultValue: 'Logout' })}</a>
        ),
        icon: <LogoutOutlined />,
      },
    ],
    [t, logout]
  );

  return (
    <div className="dashboard-layout-header">
      <div className="dashboard-layout-header-left" />
      <Space size="large">
        <HeaderDropdown overlay={<Menu items={menuItems} />}>
          <Avatar size="small" icon={<UserOutlined />} /> {email}
        </HeaderDropdown>
      </Space>
    </div>
  );
};

export default Header;

type HeaderDropdownProps = {
  children: ReactNode;
  overlay: ReactElement;
};

const HeaderDropdown = ({ children, overlay }: HeaderDropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const menu = useMemo(
    () => cloneElement(overlay, { onClick: () => setIsVisible(false) }),
    [overlay]
  );

  return (
    <Dropdown
      className="dashboard-layout-header-dropdown"
      onVisibleChange={setIsVisible}
      visible={isVisible}
      trigger={['click']}
      overlay={menu}
      overlayClassName="dashboard-layout-header-dropdown-container"
    >
      <div>
        {children} <DownOutlined />
      </div>
    </Dropdown>
  );
};
