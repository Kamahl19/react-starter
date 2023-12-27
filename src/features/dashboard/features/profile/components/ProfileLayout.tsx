import { useMemo, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { type User } from '@/api';

import DashboardPageHeader from '../../../components/DashboardPageHeader';
import { DASHBOARD_ROUTES } from '../../../routes';

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
    [t],
  );

  return (
    <>
      <DashboardPageHeader title={user.email}>
        <div>
          {t('profile:header.isConfirmed')}: {user.isConfirmed ? <>✅</> : <>❌</>}
        </div>
      </DashboardPageHeader>

      <ul>
        {menuItems.map((item) => (
          <li key={item.key}>{item.label}</li>
        ))}
      </ul>

      {children}
    </>
  );
};

export default ProfileLayout;
