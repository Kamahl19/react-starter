import { useTranslation } from 'react-i18next';
import { PageHeader, Descriptions } from 'antd';
import { UserOutlined, CheckCircleTwoTone, ExclamationCircleTwoTone } from '@ant-design/icons';

import { type User } from 'api';

type Props = {
  user: User;
};

const ProfileHeader = ({ user }: Props) => {
  const { t } = useTranslation();

  return (
    <PageHeader avatar={{ icon: <UserOutlined /> }} title={user.email}>
      <Descriptions size="small">
        <Descriptions.Item label={t('profile.header.isConfirmed', { defaultValue: 'Confirmed' })}>
          {user.isConfirmed ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 20 }} />
          ) : (
            <ExclamationCircleTwoTone twoToneColor="red" style={{ fontSize: 20 }} />
          )}
        </Descriptions.Item>
      </Descriptions>
    </PageHeader>
  );
};

export default ProfileHeader;
