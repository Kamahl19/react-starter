import { useMemo } from 'react';

import { useCurrentLanguage, LANGUAGES_CONFIG, resolveLanguage } from '@/i18n';

const LanguageSelector = () => {
  const { setLanguage, t } = useCurrentLanguage();

  const items = useMemo(
    () =>
      Object.entries(LANGUAGES_CONFIG).map(([lng, { name }]) => ({
        lng,
        label: name,
      })),
    [],
  );

  return (
    <div>
      {t('common:languageSelector.selectLanguage')}
      <ul>
        {items.map(({ lng, label }) => (
          <li key={lng}>
            <button onClick={() => setLanguage(resolveLanguage(lng))}>{label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageSelector;
