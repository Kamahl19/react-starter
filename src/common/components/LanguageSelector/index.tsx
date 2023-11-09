import { useCallback, useMemo } from 'react';

import { useCurrentLanguage, LANGUAGES_CONFIG, resolveLanguage } from '@/i18n';
import { NavbarDropdown } from '@/common/components';

const LanguageSelector = () => {
  const [language, setLanguage] = useCurrentLanguage();

  const items = useMemo(
    () =>
      Object.entries(LANGUAGES_CONFIG).map(([value, { name }]) => ({
        key: value,
        label: name,
      })),
    [],
  );

  const handleClick = useCallback(
    ({ key }: { key: string }) => {
      setLanguage(resolveLanguage(key));
    },
    [setLanguage],
  );

  return (
    <NavbarDropdown menu={{ items, onClick: handleClick }}>{language.shortName}</NavbarDropdown>
  );
};

export default LanguageSelector;
