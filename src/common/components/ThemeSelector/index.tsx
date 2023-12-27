import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useTheme, Theme } from '@/app/providers/Theme';

const ThemeSelector = () => {
  const { t } = useTranslation();
  const [, setTheme] = useTheme();

  const items = useMemo(
    () => [
      { theme: Theme.LIGHT, label: t('common:themeSelector.light') },
      { theme: Theme.DARK, label: t('common:themeSelector.dark') },
      { theme: Theme.SYSTEM, label: t('common:themeSelector.system') },
    ],
    [t],
  );

  return (
    <div>
      {t('common:themeSelector.selectTheme')}
      <ul>
        {items.map(({ theme, label }) => (
          <li key={theme}>
            <button onClick={() => setTheme(theme)}>{label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
