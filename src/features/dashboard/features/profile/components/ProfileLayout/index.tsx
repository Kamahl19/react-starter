import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PageHeader, Descriptions } from 'antd';
import { UserOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

import { type User } from 'api';
import { Widget } from 'common/components';

import { DASHBOARD_ROUTES } from '../../../../routes';

type Props = {
  user: User;
  children: ReactNode;
};

const ProfileLayout = ({ user, children }: Props) => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      {
        to: DASHBOARD_ROUTES.profileChangePassword.to,
        label: t('profile.menu.changePassword'),
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader avatar={{ icon: <UserOutlined /> }} title={user.email}>
        <Descriptions size="small">
          <Descriptions.Item label={t('profile.header.isConfirmed')}>
            {user.isConfirmed ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
            ) : (
              <ExclamationCircleTwoTone twoToneColor="red" style={{ fontSize: 20 }} />
            )}
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Widget menuItems={menuItems}>{children}</Widget>
    </>
  );
};

export default ProfileLayout;
