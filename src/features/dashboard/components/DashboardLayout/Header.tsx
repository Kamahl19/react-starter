import { type ReactNode, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Dropdown, Space, Typography, Row, Col, type MenuProps } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { css, ClassNames } from '@emotion/react';

import { ThemeSwitch } from 'app/theme';
import { getSelectedKeys } from 'common/routerUtils';
import { useAuth } from 'common/auth';
import { getMQ } from 'common/styleUtils';

import { DASHBOARD_ROUTES } from '../../routes';

type Props = {
  email: string;
};

const Header = ({ email }: Props) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { pathname } = useLocation();

  const menuProps = useMemo(() => {
    const items = [
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
    ];

    return {
      items,
      selectedKeys: getSelectedKeys(
        items.map((i) => `${i.key}`),
        pathname
      ),
    };
  }, [t, logout, pathname]);

  return (
    <Row justify="space-between" wrap={false}>
      <Col />
      <Col>
        <Space size="large">
          <ThemeSwitch />
          <HeaderDropdown menu={menuProps}>
            <Avatar size="small" icon={<UserOutlined />} />
            {email}
          </HeaderDropdown>
        </Space>
      </Col>
    </Row>
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
    <ClassNames>
      {({ css, theme: { token } }) => (
        <Dropdown
          css={styles.dropdown}
          onOpenChange={setIsVisible}
          open={isVisible}
          trigger={['click']}
          menu={menuProps}
          overlayClassName={css({
            [getMQ(token).smMax]: {
              width: '100vw',

              '.ant-dropdown-menu': {
                borderRadius: 0,
              },

              '&& .ant-dropdown-menu-item': {
                paddingBlock: token.paddingSM,
              },
            },
          })}
        >
          <Space>
            {children}
            <DownOutlined />
          </Space>
        </Dropdown>
      )}
    </ClassNames>
  );
};

const styles = {
  dropdown: css({
    cursor: 'pointer',
  }),
};
