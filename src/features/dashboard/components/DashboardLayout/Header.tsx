import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Space, Typography, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { useAuth } from 'common/auth';
import { NavbarDropdown, ThemeSwitch, LanguageSelector } from 'common/components';

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
        label: <Typography.Link onClick={logout}>{t('dashboard:topMenu.logout')}</Typography.Link>,
        icon: <LogoutOutlined />,
      },
    ],
    [t, logout]
  );

  return (
    <Row justify="space-between" wrap={false}>
      <Col />
      <Col>
        <Space size="large">
          <LanguageSelector />
          <ThemeSwitch />
          <NavbarDropdown menu={{ items }}>
            <Space>
              <Avatar size="small" icon={<UserOutlined />} />
              {email}
            </Space>
          </NavbarDropdown>
        </Space>
      </Col>
    </Row>
  );
};

export default Header;
