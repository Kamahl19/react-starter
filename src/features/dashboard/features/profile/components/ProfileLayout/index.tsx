import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { type User } from 'api';
import { Descriptions, Widget } from 'common/components';

import DashboardPageHeader from '../../../../components/DashboardPageHeader';
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
        key: DASHBOARD_ROUTES.profileChangePassword.to,
        label: (
          <Link to={DASHBOARD_ROUTES.profileChangePassword.to}>
            {t('profile:menu.changePassword')}
          </Link>
        ),
      },
    ],
    [t]
  );

  return (
    <>
      <DashboardPageHeader title={user.email}>
        <Descriptions>
          <Descriptions.Item label={t('profile:header.isConfirmed')}>
            {user.isConfirmed ? <>✅</> : <>❌</>}
          </Descriptions.Item>
        </Descriptions>
      </DashboardPageHeader>

      <Widget menuItems={menuItems}>{children}</Widget>
    </>
  );
};

export default ProfileLayout;
