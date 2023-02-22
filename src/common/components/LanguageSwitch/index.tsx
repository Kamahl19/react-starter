import { useCallback, useMemo } from 'react';
import { LANGUAGE_CODES } from 'i18n';
import { useTranslation } from 'react-i18next';
import { Select, type SelectProps } from 'antd';

const NATIVE_NAMES = {
  [LANGUAGE_CODES.EN]: 'English',
} satisfies Record<LANGUAGE_CODES, string>;

const LanguageSwitch = (props: SelectProps) => {
  const { i18n } = useTranslation();

  const options = useMemo(
    () =>
      Object.values(LANGUAGE_CODES).map((lng) => ({
        label: NATIVE_NAMES[lng],
        value: lng,
      })),
    []
  );

  const handleChange = useCallback((lng: string) => i18n.changeLanguage(lng), [i18n]);

  return (
    <Select
      size="small"
      {...props}
      onChange={handleChange}
      options={options}
      value={i18n.resolvedLanguage}
    />
  );
};

export default LanguageSwitch;
