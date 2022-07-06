import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Widget } from 'common/components';

import { DASHBOARD_ROUTES } from '../../../../routes';

type Props = {
  children: ReactNode;
};

const ProfileWidget = ({ children }: Props) => {
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

  return <Widget menuItems={menuItems}>{children}</Widget>;
};

export default ProfileWidget;
