import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useSignOut } from '@/common/auth';
import { ThemeSelector, LanguageSelector } from '@/common/components';

import { DASHBOARD_ROUTES } from '../../routes';

type Props = {
  email: string;
};

const Header = ({ email }: Props) => {
  const { t } = useTranslation();
  const { signOut } = useSignOut();

  const items = useMemo(
    () => [
      {
        key: DASHBOARD_ROUTES.profile.to,
        label: <Link to={DASHBOARD_ROUTES.profile.to}>{t('dashboard:topMenu.profile')}</Link>,
      },
      {
        type: 'divider',
        key: 'divider1',
      },
      {
        key: 'signOut',
        label: <button onClick={signOut}>{t('dashboard:topMenu.signOut')}</button>,
      },
    ],
    [t, signOut],
  );

  return (
    <div>
      <LanguageSelector />
      <ThemeSelector />
      {email}
      <ul>
        {items.map((item) => (
          <li key={item.key}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
};

export default Header;
